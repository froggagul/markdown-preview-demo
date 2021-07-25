import Head from 'next/head'
import Image from 'next/image'
import { useState, useRef } from 'react';
import Markdown from 'markdown-to-jsx';
import styles from '../styles/Home.module.css'
import Axios from 'axios';

export default function Home() {
  let textArea = useRef();

  const [md, setMd] = useState({
    title: '',
    object: '',
    thumbnail: null,
  });
  
  const addImage = async (e) => {
    const fileReader = new FileReader();

    e.stopPropagation();
    e.preventDefault();

    const url = e.dataTransfer.items[0].getAsFile(); // 드래그앤 드롭 된 대상 파일

    fileReader.readAsDataURL(url);
    fileReader.onload = () => {
      let src = fileReader.result; // read 결과

      setMd({
        ...md,
        object: md.object += `<img src='https://source.unsplash.com/random/200x200?sig=1' />`
      });
      
      textArea.current.value += `<img src='https://source.unsplash.com/random/200x200?sig=1' />`;
    };
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.textEditor}>
          <textarea
            ref={textArea}
            onDrop={addImage}
            onChange={(e) => setMd({ ...md, object: e.target.value })}
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
