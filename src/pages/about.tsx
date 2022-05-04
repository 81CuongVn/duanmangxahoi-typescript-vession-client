import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import Layout from '../components/Layout'
import { useGetAppInfoQuery } from '../generated/graphql'

interface IAboutPageProps {}

const AboutPage: React.FC<IAboutPageProps> = (props: IAboutPageProps) => {
  const { data: AppInfo, loading: GetAppInfoLoading } = useGetAppInfoQuery()
  if (GetAppInfoLoading) {
    return (
      <Flex justifyContent='center' alignItems='center' minH='100vh'>
        <Spinner />
      </Flex>
    )
  }
  return (
    <Layout WrapperSize='regular'>
      <div>{AppInfo && AppInfo.getAppInfo?.description}</div>
      <div>
        Lưu ý : trang dẽ dãi chứ không dễ tính nhé nên xin đừng đăng các nội
        dung 18+ hay các nội dung không phù hợp
      </div>
    </Layout>
  )
}

export default AboutPage
