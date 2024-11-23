import Image from "next/image";

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
      <div className="col-span-4 text-amber-950">
        <label>
          <input type="radio" className="nes-radio" name="answer" />
          <span>FreeStyle</span>
        </label>

        <label>
          <input type="radio" className="nes-radio" name="answer" />
          <span>One Thing</span>
        </label>
        <label>
          <input type="radio" className="nes-radio" name="answer" />
          <span>American Ranking</span>
        </label>
        <label>
          <input type="radio" className="nes-radio" name="answer" />
          <span>Indian Test</span>
        </label>
      </div>
    </div>
  );
}
