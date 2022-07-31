import './style.css'
import { create } from 'ipfs-http-client';
import { config } from "./config";
const { urlIpfs, urlNotFound } = config;

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
})

const file = document.querySelector<HTMLInputElement>('#file')
if (!file) throw new Error("file not found");

const link = document.querySelector<HTMLLinkElement>('#img-ipfs-url');
if (!link) throw new Error("img-ipfs-url not found");

const img = document.querySelector<HTMLImageElement>('#img-ipfs')
if (!img) throw new Error("img not found");

const spinnerCharging = document.querySelector<HTMLElement>('#spinner-charging')
if (!spinnerCharging) throw new Error("spinnerCharging not found");

document.addEventListener("DOMContentLoaded", () => {
  img.src = urlNotFound;
  link.href = urlNotFound;
})

const showAndHideImg = () => {
  img.classList.toggle("d-none");
  spinnerCharging.classList.toggle("d-none");
};

const addIpfs = async (file: File) => {
  showAndHideImg();
  const data = await ipfs.add(file);
  const url = `${urlIpfs}${data.path}`;
  img.src = url;
  link.href = url;
  console.log(url);
  showAndHideImg();
}

file.addEventListener('change', async (e) => {
  const input = e.target as HTMLInputElement;
  if (input.files) {
    const file = input.files[0];
    await addIpfs(file);

    // console.log();

  };


});
