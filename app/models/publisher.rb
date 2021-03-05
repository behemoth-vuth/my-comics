class Publisher < ActiveHash::Base
  include ActiveModel::Serialization

  fields :id, :name, :logo

  add id: 1, name: 'NXB Kim Đồng', logo: '/images/publishers/kimdong.png'
  add id: 2, name: 'NXB Trẻ', logo: '/images/publishers/nxb_tre.png'
  add id: 3, name: 'TVM Comics', logo: '/images/publishers/tvm.jpg'
  add id: 4, name: 'TABooks', logo: '/images/publishers/tabooks.png'
  add id: 5, name: 'AMAK', logo: '/images/publishers/amak.png'
  add id: 6, name: 'NXB Thanh Niên', logo: '/images/publishers/thanh_nien.png'
  add id: 7, name: 'IMP', logo: '/images/publishers/ipm.png'
  add id: 8, name: 'SkyComics', logo: '/images/publishers/skybooks.png'
end
