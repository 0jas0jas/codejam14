import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      <div className=" col-span-2">
        {/*empty div*/}
      </div>
      <div className="col-span-2 text-end text-xs" >
        <div>sathya</div>
        <div>aditya</div>
        <div>ojas</div>
      </div>
      <div className="col-span-4 text-xl font-black h-200px text-center align-middle leading-[200px]">
        <div className="">Where's my Jam?</div>
      </div>
      <div className="col-span-4 text-amber-950 flex flex-col justify-between h-[250px]">
        <Link href='/freestyle' className="nes-btn !text-black is-primary"><button type="button" >Freestyle</button></Link>
        <Link href='/cornfusion' className="nes-btn !text-black is-success"><button type="button">CornFusion</button></Link>
        <Link href='' className="nes-btn !text-black is-warning"><button type="button" >American Check</button></Link>
        <Link href='indian' className="nes-btn !text-black is-error"><button type="button" >Indian Test</button></Link>
      </div>
    </div>
  );
}
 