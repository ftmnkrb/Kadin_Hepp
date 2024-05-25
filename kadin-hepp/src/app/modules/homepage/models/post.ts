import { MenuItem } from 'primeng/api';
import { User } from '../../auth/models/user';

export interface Post {
  id?: string;
  createdUser: User;
  content: string;
  likedUsers: string[] | null;
  commentCount: number;
  createTime: number;
  images: string[];
  category: Category;
  location: PostLocation;
}

export interface Category {
  cname: string;
  code: string;
  baseName: string;
  baseCode: string;
}

export interface PostLocation {
  il: any;
  ilce: {
    il: any;
    value: any;
  };
  mahalle: {
    il: any;
    ilce: any;
    value: any;
  };
}

export const Categories = [
  {
    name: 'Saç İşlemleri',
    code: 'sac-islemleri',
    subCategories: [
      {
        cname: 'Saç Kesim',
        code: 'sac-kesim',
        baseCode: 'sac-islemleri',
        baseName: 'Saç İşlemleri',
      },
      {
        cname: 'Saç Boyama',
        code: 'sac-boyama',
        baseCode: 'sac-islemleri',
        baseName: 'Saç İşlemleri',
      },
      {
        cname: 'Saç Şekillendirme',
        code: 'sac-sekillendirme',
        baseCode: 'sac-islemleri',
        baseName: 'Saç İşlemleri',
      },
      {
        cname: 'Saç Bakım',
        code: 'sac-bakim',
        baseCode: 'sac-islemleri',
        baseName: 'Saç İşlemleri',
      },
      {
        cname: 'Saç Kaynak',
        code: 'sac-kaynak',
        baseCode: 'sac-islemleri',
        baseName: 'Saç İşlemleri',
      },
      {
        cname: 'Mikro Kaynak',
        code: 'mikro-kaynak',
        baseCode: 'sac-islemleri',
        baseName: 'Saç İşlemleri',
      },
    ],
  },
  {
    name: 'Tırnak Bakım',
    code: 'tirnak-bakim',
    subCategories: [
      {
        cname: 'Manikür',
        code: 'manikur',
        baseCode: 'tirnak-bakim',
        baseName: 'Tırnak Bakım',
      },
      {
        cname: 'Pedikür',
        code: 'pedikur',
        baseCode: 'tirnak-bakim',
        baseName: 'Tırnak Bakım',
      },
      {
        cname: 'Oje',
        code: 'oje',
        baseCode: 'tirnak-bakim',
        baseName: 'Tırnak Bakım',
      },
      {
        cname: 'Kalıcı Oje',
        code: 'kalici-oje',
        baseCode: 'tirnak-bakim',
        baseName: 'Tırnak Bakım',
      },
      {
        cname: 'Kalıcı Tırnak',
        code: 'kalici-tirnak',
        baseCode: 'tirnak-bakim',
        baseName: 'Tırnak Bakım',
      },
      {
        cname: 'Jel Tırnak',
        code: 'jel-tirnak',
        baseCode: 'tirnak-bakim',
        baseName: 'Tırnak Bakım',
      },
      {
        cname: 'Protez Tırnak',
        code: 'protez-tirnak',
        baseCode: 'tirnak-bakim',
        baseName: 'Tırnak Bakım',
      },
    ],
  },
  {
    name: 'Gelin',
    code: 'gelin',
    subCategories: [
      {
        cname: 'Gelin Saçı',
        code: 'gelin-saci',
        baseCode: 'gelin',
        baseName: 'Gelin',
      },
      {
        cname: 'Gelin Makyajı',
        code: 'gelin-makyaji',
        baseCode: 'gelin',
        baseName: 'Gelin',
      },
      {
        cname: 'Nişan Saçı',
        code: 'nisan-saci',
        baseCode: 'gelin',
        baseName: 'Gelin',
      },
      {
        cname: 'Nişan Makyajı',
        code: 'nisan-makyaji',
        baseCode: 'gelin',
        baseName: 'Gelin',
      },
      {
        cname: 'Kına Saç + Makyaj',
        code: 'kina-sac-makyaj',
        baseCode: 'gelin',
        baseName: 'Gelin',
      },
    ],
  },
  {
    name: 'Makyaj & Yüz',
    code: 'makyaj-yuz',
    subCategories: [
      {
        cname: 'Gündelik Makyaj',
        code: 'gundelik-makyaj',
        baseCode: 'makyaj-yuz',
        baseName: 'Makyaj & Yüz',
      },
      {
        cname: 'Gece Makyajı',
        code: 'gece-makyaji',
        baseCode: 'makyaj-yuz',
        baseName: 'Makyaj & Yüz',
      },
      {
        cname: 'Porselen Makyaj',
        code: 'porselen-makyaj',
        baseCode: 'makyaj-yuz',
        baseName: 'Makyaj & Yüz',
      },
      {
        cname: 'Kaş Tasarımı',
        code: 'kas-tasarimi',
        baseCode: 'makyaj-yuz',
        baseName: 'Makyaj & Yüz',
      },
      {
        cname: 'İpek Kirpik',
        code: 'ipek-kirpik',
        baseCode: 'makyaj-yuz',
        baseName: 'Makyaj & Yüz',
      },
      {
        cname: 'Kirpik Lifting',
        code: 'kirpik-lifting',
        baseCode: 'makyaj-yuz',
        baseName: 'Makyaj & Yüz',
      },
    ],
  },
  {
    name: 'Cilt Bakımı ve Epilasyon',
    code: 'cilt-bakimi-epilasyon',
    subCategories: [
      {
        cname: 'Ağda',
        code: 'agda',
        baseCode: 'cilt-bakimi-epilasyon',
        baseName: 'Cilt Bakımı ve Epilasyon',
      },
      {
        cname: 'Lazer Epilasyon',
        code: 'lazer-epilasyon',
        baseCode: 'cilt-bakimi-epilasyon',
        baseName: 'Cilt Bakımı ve Epilasyon',
      },
      {
        cname: 'Cilt Bakımı',
        code: 'cilt-bakimi',
        baseCode: 'cilt-bakimi-epilasyon',
        baseName: 'Cilt Bakımı ve Epilasyon',
      },
    ],
  },
];
