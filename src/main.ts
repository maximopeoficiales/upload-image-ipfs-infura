import './style.css'
import { create } from 'ipfs-http-client';
const urlIpfs = "https://ipfs.io/ipfs/";
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
})
const file = document.querySelector<HTMLInputElement>('#file')!
const img = document.querySelector<HTMLImageElement>('#img-ipfs')!

const addIpfs = async (file: File) => {
  const results = [];
  const data = await ipfs.add(file);

  img.src = `${urlIpfs}${data.path}`;
  console.log(`${urlIpfs}${data.path}`);
  
  // for await (const _result of (data as any)) {
  //   results.push(_result);
  // }
  // console.log(results);

}

file.addEventListener('change', async (e) => {
  const input = e.target as HTMLInputElement;
  if (input.files) {
    const file = input.files[0];
    await addIpfs(file);

    // console.log();

  };


});
