import Image from "next/image";
import styles from "./page.module.css";
import MainComponent from "@/components/MainComponent";
export default function Home() {
  return (
    <div className={`${styles.page} bg-dark text-white`}>
      <MainComponent text="" />
    </div>
  );
}
