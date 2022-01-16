import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { path } from 'src/constants/path'
import * as S from './user.style'
import Profile from './Profile/Profile'
import Password from './Password/Password'
import Purchase from './Purchase/Purchase'

export default function User() {
  return (
    <div>
      <S.Container className="container">
        <S.Sidebar>
          <S.Brief>
            <S.BriefAvatar to={path.user + path.profile}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                alt=""
              />
            </S.BriefAvatar>
            <S.BriefRight>
              <S.BriefUsername>demo</S.BriefUsername>
              <S.BriefEdit to={path.user + path.profile}>
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 4 }}
                >
                  <path
                    d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                    fill="#9B9B9B"
                    fillRule="evenodd"
                  />
                </svg>
                Sửa hồ sơ
              </S.BriefEdit>
            </S.BriefRight>
          </S.Brief>
          <S.SidebarMenu>
            <S.SidebarMenuEntry to={path.user + path.profile}>
              <S.SidebarMenuEntryIcon>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt=""
                />
              </S.SidebarMenuEntryIcon>
              Tài khoản của tôi
            </S.SidebarMenuEntry>
            <S.SidebarMenuEntry to={path.user + path.password}>
              <S.SidebarMenuEntryIcon>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt=""
                />
              </S.SidebarMenuEntryIcon>
              Đổi mật khẩu
            </S.SidebarMenuEntry>
            <S.SidebarMenuEntry to={path.user + path.purchase}>
              <S.SidebarMenuEntryIcon>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt=""
                />
              </S.SidebarMenuEntryIcon>
              Đơn mua
            </S.SidebarMenuEntry>
          </S.SidebarMenu>
        </S.Sidebar>
        <S.Main>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={path.user + path.profile} />}
            ></Route>
            <Route path={path.profile.slice(1)} element={<Profile />}></Route>
            <Route path={path.password.slice(1)} element={<Password />}></Route>
            <Route path={path.purchase.slice(1)} element={<Purchase />}></Route>
          </Routes>
        </S.Main>
      </S.Container>
    </div>
  )
}
