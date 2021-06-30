import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import styles from '../styles/Home.module.css'
import Axios from 'axios';

export default function Home() {
  const [md, setMd] = useState({
    title: '',
    object: '',
    thumbnail: null,
  });
  const addImage = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const res = await Axios.get('/api/image');
    const { url } = res.data;
    console.log(e.target);
    setMd({
      ...md,
      object: md.object + `![](${url})`,
    })
    console.log(res.data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.textEditor}>
          <textarea
            value={md.object}
            onChange={(e) => {
              setMd({
                ...md,
                object: e.target.value,
              })
            }}
            onDrop={addImage}
          />
        </div>
        <div className={styles.preview}>
          <Markdown>
            {md.object}
          </Markdown>
        </div>
      </main>
    </div>
  )
}
