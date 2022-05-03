import React from 'react'
import Layout from '../components/Layout'

interface IAboutPageProps  {}

const AboutPage:React.FC<IAboutPageProps> = (props: IAboutPageProps) => {
    return (
        <Layout WrapperSize='regular'>
            Lưu ý : tranh dẽ dãi chứ không dễ tính nhé nên xin đừng đăng các nội dung 18+ hay các nội dung không phù hợp 
      </Layout>
  )
}

export default AboutPage