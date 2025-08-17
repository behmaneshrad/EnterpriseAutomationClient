"use client";

import React, {useState, useEffect} from 'react';
import { useAuth } from '@/context/AuthContext';
import ActionTimeLine from '@/components/ActionTimeLine';
import { notFound, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import WorkflowTimeline from '@/components/WorkflowTimeline';


interface Action {
  phase: string;
  performer: string;
  actionType: string;
  timestamp: string;
}

const RequestDetailPage = () => {
  const {tokens, isAuthenticated} = useAuth();
  const {id} = useParams<{id: string}>();

  const [actions, setActions]= useState<Action[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && tokens?.accessToken && id) {
      const fetchActions = async () => {
        setLoading(true);
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/requests/${id}/logs`;
          const response = await fetch(apiUrl, {
            headers: {
              'Authorization': `Bearer ${tokens.accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch actions: ${response.statusText}`)
          }

          const data = await response.json();
          setActions(data);
        } catch (error) {
          console.error('Error fetching actions:', error);
          toast.error('خطا در دریافت تاریخچه اقدامات')
        } finally {
          setLoading(false)
        }
      }
      fetchActions()
    } else if (!isAuthenticated) {
      // اگر کاربر لاگین نکرده باشد
      setLoading(false)
    }
  }, [isAuthenticated, tokens, id])

  if (!isAuthenticated && !loading) {
    // اگر کاربر لاگین نکرده بود به صفحه لاگین منتقل شود
    return (
      <div className='container mx-auto p-8 text-center'>
        <p>لطفا برای مشاهده جزئیات،ابتدا وارد شوید.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='container mx-auto p-8 text-center'>
        <p>در حال بارگذاری تاریخچه اقدامات...</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-4xl font-bold mb-8 text-center'>جزئیات درخواست (ID: {id})</h1>
      <ActionTimeLine actions={actions}/>
    </div>
  )
}

export default RequestDetailPage;
