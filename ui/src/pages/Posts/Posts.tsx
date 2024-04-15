import React, { useEffect } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { Button } from '../../components/Button/Button'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useGetAllPostsQuery } from '../../app/services/posts'
import { Table } from 'antd'
import { ColumnType } from 'antd/es/table'
import { Post } from '../../app/services/types'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'

const columns: ColumnType<Post>[] = [
  {
    title: "Текст",
    dataIndex: "text",
    key: "text"
  },
  {
    title: "Дата создания",
    dataIndex: "data_create",
    key: "data_create"
  },
  {
    title: "Лайки",
    dataIndex: "likes_number",
    key: "likes_number"
  }
]

export const Posts = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllPostsQuery();

  useEffect(() => {
    if (!user) {
      navigate('/authorize');
    }
  }, [navigate, user]);

  return (
    <Layout>
        <Button type="primary" onClick={() => null} icon={ <PlusCircleOutlined /> }>
            Добавить
        </Button>
        <Table 
            loading={ isLoading }
            dataSource={ data }
            pagination={ false }
            columns={ columns }
            rowKey={ (record) => record.id }
            onRow={(record) => {
              return {
                onClick: () => navigate(`${Paths.posts}/${record.id}`)
              }
            }}
        />
    </Layout>
  )
}
