import AdminStyles from './Admin.module.css';
import IconBreadcrumbs from './Breadcrumbs';
import { Routes, Route } from 'react-router-dom';
import Foods from '../Foods/Foods';
import Orders from '../Orders/Orders';
import AdminMenus from '../AdminMenus/Menu/AdminMenus';
import AddMenu from '../AdminMenus/Menu/AddMenu';
import EditMenu from '../AdminMenus/Menu/EditMenu';
import DeleteMenu from '../AdminMenus/Menu/DeleteMenu';
import AddFood from '../AdminMenus/Foods/AddFood';
import AdminFoods from '../AdminMenus/Foods/AdminFoods';
import EditFood from '../AdminMenus/Foods/EditFood';
import DeleteFood from '../AdminMenus/Foods/DeleteFood';

function Admin() {
  return (
    <div className={AdminStyles.container}>
      <div className={`${AdminStyles.navigation} ${AdminStyles.shadow}`}>
        <IconBreadcrumbs />
      </div>
      <Routes>
        <Route exact path='menus' element={<AdminMenus />} />
        <Route exact path='foods' element={<AdminFoods />} />
        <Route exact path='orders' element={<Orders />} />
        <Route exact path='menus/add' element={<AddMenu />} />
        <Route exact path='menus/edit/:id' element={<EditMenu />} />
        <Route exact path='menus/delete/:id' element={<DeleteMenu />} />
        <Route exact path='foods/add' element={<AddFood />} />
        <Route exact path='foods/edit/:id' element={<EditFood />} />
        <Route exact path='foods/delete/:id' element={<DeleteFood />} />
      </Routes>
    </div>
  );
}

export default Admin;
