import {getClient} from '@api/client';
import {useAppDispatch} from '@store/hooks';
import {updateNotification} from '@store/notification';
import {useQuery} from '@tanstack/react-query';
import catchAxiosError from '@utils/catchAxiosError';
import {AudioData} from 'src/@types/audio';

const fetchLatest = async (): Promise<AudioData[]> => {
  const client = await getClient();
  const {data} = await client('/audio/latest');
  return data.audios;
};

export const useFetchLatestAudios = () => {
  const dispatch = useAppDispatch();
  return useQuery(['latest-uploads'], {
    queryFn: () => fetchLatest(),
    onError(err) {
      const errorMessage = catchAxiosError(err);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    },
  });
};
