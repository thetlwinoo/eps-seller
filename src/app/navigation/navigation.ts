import { RootNavigation } from '@eps/types';

export const navigation: RootNavigation[] = [
  {
    id: 'inventory',
    title: 'Inventory',
    translate: 'NAV.INVENTORY',
    type: 'group',    
    children: [
      {
        id: 'products',
        title: 'Products',
        translate: 'NAV.PRODUCTS.TITLE',
        type: 'collapsable',
        icon: 'shopping-bag',
        children: [
          {
            id: 'manage-products',
            title: 'Manage Products',
            type: 'item',
            url: '/products/manage-products',
            exactMatch: true,
          },
          {
            id: 'add-product',
            title: 'Add Product',
            type: 'item',
            url: '/products/manage-products/new',
            exactMatch: true,
          },
          {
            id: 'manage-images',
            title: 'Manage Images',
            type: 'item',
            url: '/products/manage-images',
            exactMatch: true,
          },
        ],
      },
      {
        id: 'orders',
        title: 'Orders',
        translate: 'NAV.ORDERS.TITLE',
        type: 'collapsable',
        icon: 'truck',
        children: [
          {
            id: 'manage-orders',
            title: 'Manage Orders',
            type: 'item',
            url: '/orders/manage-orders',
            exactMatch: true,
          },
          {
            id: 'manage-return-orders',
            title: 'Manage Return Orders',
            type: 'item',
            url: '/orders/manage-return-orders',
            exactMatch: true,
          },
          {
            id: 'manage-reviews',
            title: 'Manage Reviews',
            type: 'item',
            url: '/orders/manage-reviews',
            exactMatch: true,
          },
        ],
      },
      {
        id: 'promotions',
        title: 'Promotions',
        translate: 'NAV.PROMOTIONS.TITLE',
        type: 'collapsable',
        icon: 'shopping-bag',
        children: [
          {
            id: 'campaign-management',
            title: 'Campaign Management',
            type: 'item',
            url: '/promotions/campaign-management',
            exactMatch: true,
          },
          {
            id: 'seller-voucher',
            title: 'Seller Voucher',
            type: 'item',
            url: '/promotions/seller-voucher',
            exactMatch: true,
          },
          {
            id: 'free-shipping',
            title: 'Free Shipping',
            type: 'item',
            url: '/promotions/free-shipping',
            exactMatch: true,
          },
        ],
      },
      {
        id: 'store',
        title: 'Store',
        translate: 'NAV.STORE.TITLE',
        type: 'item',
        icon: 'store',
        url: '/store',
      },
    ],
  },
  {
    id: 'account',
    title: 'Account',
    translate: 'NAV.ACCOUNT',
    type: 'group',
    children: [
      {
        id: 'finance',
        title: 'Finance',
        translate: 'NAV.FINANCE.TITLE',
        type: 'collapsable',
        icon: 'bank',
        children: [
          {
            id: 'account-statements',
            title: 'Account Statements',
            type: 'item',
            url: '/finance/account-statements',
            exactMatch: true,
          },
          {
            id: 'order-overview',
            title: 'Order Overview',
            type: 'item',
            url: '/finance/order-overview',
            exactMatch: true,
          },
          {
            id: 'transaction-overview',
            title: 'Transaction Overview',
            type: 'item',
            url: '/finance/transaction-overview',
            exactMatch: true,
          },
        ],
      },
    ],
  },
];
