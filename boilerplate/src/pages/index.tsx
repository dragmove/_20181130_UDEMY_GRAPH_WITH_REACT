import Head from 'next/head';
import Link from 'next/link';
import { Award } from '@shared/interfaces/common';
import { profileService } from '@client/services/profile';
import axios, { AxiosResponse, AxiosError } from 'axios';
import nookies from 'nookies';

export default function Home(props: unknown) {
  console.log('Home props :', props);

  return (
    <div>
      <Head>
        <title>/</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>hello index</p>
      </main>
    </div>
  );
}

/*
export const getServerSideProps = async (context) => {
  let name: any;

  try {
    name = await profileService.getName();
  } catch (err) {
    // TODO: redirect or display alert message
  }

  const data: Award[] = name?.data ?? null;

  return {
    props: {
      data,
    },
  };
};
*/
