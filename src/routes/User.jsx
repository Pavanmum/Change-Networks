import { Route } from 'react-router-dom'
import AdminProfilePage from '../Pages/Admin/Profile Page/AdminProfilePage'
import AdminUsers from '../Pages/Admin/AdminUsers/adminUsers'
import AccessSetting from '../Pages/Admin/Access Setting/accessSetting'
import Protected from '../helper/protectedRoute'

const UserAdmin = () => {
  return (
    <>
    {/* Admin Routes */}
    <Route path="/change/user" element={
    <Protected>
    <AdminProfilePage />
    </Protected>
    } />
    <Route path="/change/user/users" element={
    <Protected>
    <AdminUsers />
    </Protected>
    } />
    <Route path="/change/user/access_setting" element={
    <Protected>
    <AccessSetting />
    </Protected>
    } />

    {/* <Route path="/change_pp/gallery" element={<AdminGallery />} /> */}
    </>
  )
}

export default UserAdmin