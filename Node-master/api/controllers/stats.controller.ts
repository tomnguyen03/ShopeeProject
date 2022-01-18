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
  try {
    const sales: any = await PurchaseModel.aggregate([
      { $match: { createdAt: { $gte: nowMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$buy_count',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          sold: '$total',
        },
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
  try {
    const income: any = await PurchaseModel.aggregate([
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
  const lastMonth: Date = new Date(date.setMonth(date.getMonth() - 1))
  const nowMonth: Date = new Date(date.getMonth())
  let query: any = req.query.new
  let condition: any = {
    status: {
      $ne: STATUS_PURCHASE.WAIT_FOR_CONFIRMATION,
    },
  }

  let purchases: any = await PurchaseModel.aggregate([
    {
      $match: { createdAt: { $gte: date } },
    },
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
        _id: { createdAt: '$createdAt', user: '$user' },
        totalPrice: { $sum: { $multiply: ['$buy_count', '$price'] } },
      },
    },
    {
      $project: {
        _id: 0,
        user: '$_id.user.email',
        totalPrice: '$totalPrice',
        day: '$_id.createdAt',
      },
    },
    {
      $sort: { totalPrice: -1 },
    },
  ])

  const response = {
    message: 'Lấy tong user order thành công',
    data: purchases,
  }
  return responseSuccess(res, response)
}
// GET MONTHLY INCOME
// router.get('/', verifyTokenAndAdmin, async (req, res) => {
//   const query = req.query.new
//   try {
//     const users = query
//       ? await User.find().sort({ _id: -1 }).limit(5)
//       : await User.find()
//     res.status(200).json(users)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// })

// //GET ALL PRODUCT
// router.get("/", async (req, res) => {
//   const qnew = req.query.new;
//   const qCategory = req.query.category;
//   try {
//     let products;

//     if (qnew) {
//       products = await Product.find().sort({ createdAt: -1 }).limit(2);
//     } else if (qCategory) {
//       products = await Product.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       products = await Product.find();
//     }
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
