import { useRouter } from "next/router"
export default function Resources() {
  const router = useRouter();
  const goToPage = (page) => {
    console.log(page)
    if (page !== '/Worship' && page !== '/Sermons' && page !== '/Events') {
      return;
    }
    router.push(page)
  }
  return (<div className="container   my-5 ">
    <h1 className="main-heading mt-5">Catalog</h1>
    <br />
    <br />
    <div className="row ">
      <div className="col-md-6 bg-container overflow-hidden p-0" onClick={() => goToPage('/Worship')}>
        <div className="item" ></div>
        <div style={{ width: "100%", height: "100%", position: "relative", top: "0px;" }}>
          <div className="item-bg">WORSHIP</div>
          <div className="bg bg1"></div>
        </div>
      </div>
      <div className="col-md-6 bg-container overflow-hidden p-0" onClick={() => goToPage('/Events')}>
        <div className="item" ></div>
        <div style={{ width: "100%", height: "100%", position: "relative", top: "0px;" }}>
          <div className="item-bg">EVENTS</div>
          <div className="bg bg2"></div>
        </div>
      </div>
      <div className="col-md-6 bg-container overflow-hidden p-0" onClick={() => goToPage('/Sermons')}>
        <div className="item" ></div>
        <div style={{ width: "100%", height: "100%", position: "relative", top: "0px;" }}>
          <div className="item-bg">SERMONS</div>
          <div className="bg bg3"></div>
        </div>
      </div>
      <div className="col-md-6 bg-container overflow-hidden p-0">
        <div className="item"></div>
        <div style={{ width: "100%", height: "100%", position: "relative", top: "0px;" }}>
          <div className="item-bg">Baptisms</div>
          <div className="bg bg1"></div>
        </div>
      </div>
    </div>
  </div>)
}