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
    path: 'checkout/:costumeID',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'profile-change',
    loadChildren: () => import('./profile-change/profile-change.module').then( m => m.ProfileChangePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'toko-product-tambah',
    loadChildren: () => import('./toko-product-tambah/toko-product-tambah.module').then( m => m.TokoProductTambahPageModule)
  },
  {
    path: 'toko-product-edit/:id',
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
  {
    path: 'ubah-sandi',
    loadChildren: () => import('./ubah-sandi/ubah-sandi.module').then( m => m.UbahSandiPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule)
  },  {
    path: 'verifikasi-user',
    loadChildren: () => import('./verifikasi-user/verifikasi-user.module').then( m => m.VerifikasiUserPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
