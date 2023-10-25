import {AccountIcon2, CategoryIcon, DashboardIcon, DepositIcon, ExchangeIcon, InvestmentIcon, PaintIcon, SupportIcon, WithdrawalIcon } from "../icon";

export const menuItems = [
  {
    href: '/admin',
    title: 'Dashboard',
    icon: <DashboardIcon/>
  },
  {
    href: '/admin/Customers',
    title: 'Customers',
    icon: <AccountIcon2/>
  },
  {
    title: 'Catalog',
    icon: <DepositIcon />,
    subItems: [
      {
        href: '/admin/catalog/Addproduct',
        title: 'Add Product',
        icon: <DepositIcon/>
      },
      {
        href: '/admin/catalog/Productlist',
        title: 'Product List',
        icon: <DepositIcon/>
      },
      {
        href: '/admin/catalog/Category',
        title: 'Category',
        icon: <CategoryIcon/>
      },
      {
        href: '/admin/catalog/Categorylist',
        title: 'Category List',
        icon: <CategoryIcon/>
      },
      {
        href: '/admin/catalog/Color',
        title: 'Color',
        icon: <PaintIcon/>
      },
      {
        href: '/admin/catalog/Colorlist',
        title: 'Color List',
        icon: <PaintIcon/>
      },
      // Add more subitems as needed
    ],
  },
  {
    href: '/admin/Orders',
    title: 'Orders',
    icon: <WithdrawalIcon/>
  },
  {
    title: 'Marketing',
    icon: <ExchangeIcon />,
    subItems: [
      {
        href: '/admin/marketing/Addcoupon',
        title: 'Add Coupon',
        icon: <InvestmentIcon/>
      },
      {
        href: '/admin/marketing/Couponlist',
        title: 'Coupon List',
        icon: <InvestmentIcon/>
      },
      // Add more subitems as needed
    ],
  },  
  {
    href: '/admin/Enquiry',
    title: 'Enquiries',
    icon: <SupportIcon/>
  },
];