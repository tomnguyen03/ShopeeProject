import { Request, Response } from 'express'
import { STATUS_PURCHASE } from '../constants/purchase'
import { STATUS } from '../constants/status'
import { ProductModel } from '../database/models/product.model'
import { PurchaseModel } from '../database/models/purchase.model'
import { ErrorHandler, responseSuccess, responseError } from '../utils/response'
import { handleImageProduct } from './product.controller'
import { cloneDeep } from 'lodash'
import { cat } from 'shelljs'

// Get all purchase
export const getAllPurchases = async (req: Request, res: Response) => {
  let condition: any = {
    status: STATUS_PURCHASE.DELIVERED,
  }

  let purchases: any = await PurchaseModel.find(condition)
    .populate({
      path: 'product',
      populate: {
        path: 'category',
      },
    })
    .sort({
      createdAt: -1,
    })
    .limit(5)
  purchases = purchases.map((purchase) => {
    purchase.product = handleImageProduct(cloneDeep(purchase.product))
    return purchase
  })
  const response = {
    message: 'Lấy đơn mua thành công',
    data: purchases,
  }
  return responseSuccess(res, response)
}

// GET ALL SALES
export const getSales = async (req: Request, res: Response) => {
  const date: Date = new Date()
  const lastMonth: Date = new Date(date.setMonth(date.getMonth() - 1))
  const nowMonth: Date = new Date(date.getMonth())
  const nowYear: Date = new Date(date.getFullYear())
  try {
    const sales: any = await PurchaseModel.aggregate([
      // { $match: { createdAt: { $lte: nowYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
          sales: '$buy_count',
        },
      },
      {
        $group: {
          _id: { year: '$year', month: '$month' },
          total: { $sum: '$sales' },
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          sold: '$total',
        },
      },
      {
        $sort: { year: -1 },
      },
    ])

    const response = {
      message: 'Lấy tổng bán theo thang thành công',
      data: sales,
    }

    return responseSuccess(res, response)
  } catch (err) {
    return responseError(res, err)
  }
}

// GET MONTHLY INCOME
export const getInCome = async (req: Request, res: Response) => {
  const query = req.query.month
  let income: any = null
  try {
    if (query) {
      income = await PurchaseModel.aggregate([
        {
          $project: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' },
            buy_count: '$buy_count',
            price: '$price',
          },
        },
        {
          $group: {
            _id: { year: '$year', month: '$month' },
            totalSaleAmount: { $sum: { $multiply: ['$buy_count', '$price'] } },
          },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            totalSaleAmount: '$totalSaleAmount',
          },
        },
        {
          $sort: {
            year: -1,
            month: -1,
          },
        },
      ])
    } else {
      income = await PurchaseModel.aggregate([
        {
          $group: {
            _id: 0,
            totalSaleAmount: { $sum: { $multiply: ['$buy_count', '$price'] } },
          },
        },
        {
          $project: {
            _id: 0,
            totalSaleAmount: '$totalSaleAmount',
          },
        },
      ])
    }

    const response = {
      message: 'Lấy income thành công',
      data: income,
    }

    return responseSuccess(res, response)
  } catch (err) {
    return responseError(res, err)
  }
}
// GET USER ORDER
export const getUserOrder = async (req: Request, res: Response) => {
  const date: Date = new Date()
  const nowMonth: Date = new Date(date.getMonth())
  let query: any = req.query.new

  let purchases: any = await PurchaseModel.aggregate([
    // {
    //   $match: { createdAt: { $lte: date } },
    // },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $project: {
        purcharse_id: '$_id',
        user: { $first: '$user' },
        status: '$status',
        createdAt: '$createdAt',
        month: { $month: '$createdAt' },
        year: { $year: '$createdAt' },
        buy_count: '$buy_count',
        price: '$price',
      },
    },
    {
      $group: {
        _id: {
          purcharse_id: '$purcharse_id',
          year: '$year',
          month: '$month',
          createdAt: '$createdAt',
        },
        user: { $first: '$user' },
        status: { $first: '$status' },
        totalPrice: { $sum: { $multiply: ['$buy_count', '$price'] } },
      },
    },
    {
      $project: {
        _id: 0,
        purcharse_id: '$_id.purcharse_id',
        user: '$user.name',
        totalPrice: '$totalPrice',
        year: '$_id.year',
        month: '$_id.month',
        day: {
          $dateToString: { format: '%d-%m-%Y', date: '$_id.createdAt' },
        },
        status: '$status',
      },
    },
    {
      $sort: {
        year: -1,
        month: -1,
        day: -1,
        totalPrice: -1,
      },
    },
  ])

  const response = {
    message: 'Lấy tong user order thành công',
    data: purchases,
  }
  return responseSuccess(res, response)
}
// GET TOP CUSTOMER
export const getTopCustomer = async (req: Request, res: Response) => {
  const date: Date = new Date()
  const lastMonth: Date = new Date(date.setMonth(date.getMonth() - 1))
  const nowMonth: Date = new Date(date.getMonth())
  let query: any = req.query.new
  let condition: any = {
    status: {
      $ne: STATUS_PURCHASE.WAIT_FOR_CONFIRMATION,
    },
  }

  let purchases: any = await PurchaseModel.aggregate([
    // {
    //   $match: { createdAt: { $lte: date } },
    // },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $group: {
        _id: '$user',
        totalOrder: { $sum: '$buy_count' },
        totalPrice: { $sum: { $multiply: ['$buy_count', '$price'] } },
      },
    },
    {
      $project: {
        _id: 0,
        user: '$_id.name',
        totalOrder: '$totalOrder',
        totalPrice: '$totalPrice',
      },
    },
    {
      $sort: { totalPrice: -1 },
    },
  ])

  const response = {
    message: 'Lấy top order thành công',
    data: purchases,
  }
  return responseSuccess(res, response)
}
