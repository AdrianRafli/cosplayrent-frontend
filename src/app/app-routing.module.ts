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
  },
  {
    path: 'verifikasi-user',
    loadChildren: () => import('./verifikasi-user/verifikasi-user.module').then( m => m.VerifikasiUserPageModule)
  },
  {
    path: 'pembayaran-status',
    loadChildren: () => import('./pembayaran-status/pembayaran-status.module').then( m => m.PembayaranStatusPageModule)
  },
  {
    path: 'emoney',
    loadChildren: () => import('./emoney/emoney.module').then( m => m.EmoneyPageModule)
  },
  {
    path: 'emoney-history',
    loadChildren: () => import('./emoney-history/emoney-history.module').then( m => m.EmoneyHistoryPageModule)
  },
  {
    path: 'see-comment',
    loadChildren: () => import('./see-comment/see-comment.module').then( m => m.SeeCommentPageModule)
  },
  {
    path: 'topup-payment',
    loadChildren: () => import('./topup-payment/topup-payment.module').then( m => m.TopupPaymentPageModule)
  },
  {
    path: 'topup',
    loadChildren: () => import('./topup/topup.module').then( m => m.TopupPageModule)
  },
  {
    path: 'pesanan',
    loadChildren: () => import('./pesanan/pesanan.module').then( m => m.PesananPageModule)
  },
  {
    path: 'pesanandetail/:id',
    loadChildren: () => import('./pesanandetail/pesanandetail.module').then( m => m.PesanandetailPageModule)
  },
  {
    path: 'orderdetail/:id',
    loadChildren: () => import('./orderdetail/orderdetail.module').then( m => m.OrderdetailPageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
