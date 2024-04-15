import React from 'react'
import { useFeedQuery } from '../../app/services/auth'

export const Auth = ({ children }: { children: JSX.Element }) => {
    const { isLoading } = useFeedQuery();
    if (isLoading) {
        return <span>Загрузка...</span>
    }
  return children;
}
