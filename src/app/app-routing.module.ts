import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'search/:search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'detail-product/:id',
    loadChildren: () => import('./detail-product/detail-product.module').then( m => m.DetailProductPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'profil-change',
    loadChildren: () => import('./profil-change/profil-change.module').then( m => m.ProfilChangePageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },  {
    path: 'toko-product-tambah',
    loadChildren: () => import('./toko-product-tambah/toko-product-tambah.module').then( m => m.TokoProductTambahPageModule)
  },
  {
    path: 'toko-product-edit',
    loadChildren: () => import('./toko-product-edit/toko-product-edit.module').then( m => m.TokoProductEditPageModule)
  },
  {
    path: 'toko-home-page',
    loadChildren: () => import('./toko-home-page/toko-home-page.module').then( m => m.TokoHomePagePageModule)
  },

  {
    path: 'toko-produk',
    loadChildren: () => import('./toko-produk/toko-produk.module').then( m => m.TokoProdukPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
