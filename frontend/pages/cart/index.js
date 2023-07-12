import React from 'react'

export default function CartIndex() {
  return (
    <>
      <div className="row mt-5 mx-5">
        <div className="col-sm-8 cart-area">
          <h4 className="mb-3">購物車</h4>
          <div className="card mb-3 border-0 cart-card">
            <div className="row g-0">
              <div className="col-md-3">
                <img
                  src="./images/cart-1.jpeg"
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h5 className="card-title card-text d-flex justify-content-between align-items-center">
                    Nike Air Force 1 PLT.AF.ORM <span>$4,000.00</span>
                  </h5>
                  <p className="card-text">
                    Pale Ivory/Light Orewood Brown/白/Summit White
                  </p>

                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label
                        htmlFor="inputPassword6"
                        className="col-form-label"
                      >
                        數量:
                      </label>
                    </div>
                    <div className="col-auto">
                      <select
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                      >
                        <option selected>0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>

                  <div className="iconbar">
                    <i className="bi bi-suit-heart"></i>
                    <i className="bi bi-trash3"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card mb-3 border-0 cart-card">
            <div className="row g-0">
              <div className="col-md-3">
                <img
                  src="./images/cart-1.jpeg"
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h5 className="card-title card-text d-flex justify-content-between align-items-center">
                    Nike Air Force 1 PLT.AF.ORM <span>$4,000.00</span>
                  </h5>
                  <p className="card-text">
                    Pale Ivory/Light Orewood Brown/白/Summit White
                  </p>

                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label
                        htmlFor="inputPassword6"
                        className="col-form-label"
                      >
                        數量:
                      </label>
                    </div>
                    <div className="col-auto">
                      <select
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                      >
                        <option selected>0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>

                  <div className="iconbar">
                    <i className="bi bi-suit-heart"></i>
                    <i className="bi bi-trash3"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card mb-3 border-0 cart-card">
            <div className="row g-0">
              <div className="col-md-3">
                <img
                  src="./images/cart-1.jpeg"
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-9">
                <div className="card-body">
                  <h5 className="card-title card-text d-flex justify-content-between align-items-center">
                    Nike Air Force 1 PLT.AF.ORM <span>$4,000.00</span>
                  </h5>
                  <p className="card-text">
                    Pale Ivory/Light Orewood Brown/白/Summit White
                  </p>

                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label
                        htmlFor="inputPassword6"
                        className="col-form-label"
                      >
                        數量:
                      </label>
                    </div>
                    <div className="col-auto">
                      <select
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                      >
                        <option selected>0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>

                  <div className="iconbar">
                    <i className="bi bi-suit-heart"></i>
                    <i className="bi bi-trash3"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="col-sm-4">
          <h4 className="mb-3">摘要</h4>

          <p className="card-text d-flex justify-content-between align-items-center">
            小計 <span>$4,000.00</span>
          </p>
          <hr />
          <p className="card-text d-flex justify-content-between align-items-center">
            預估運費與手續費 <span>$300.00</span>
          </p>
          <hr />
          <p className="card-text d-flex justify-content-between align-items-center">
            總計 <span>$4,300.00</span>
          </p>
          <hr />
          <button className="btn btn-primary w-100 mb-3">會員結帳</button>
          <button className="btn btn-primary w-100 mb-3">訪客結帳</button>
        </div>
      </div>
      <div className="row mt-5 mx-5">
        <div className="col-sm-12 cart-area">
          <h4 className="mb-3">最愛</h4>
          <p>想要檢視你的最愛嗎？ 加入我們 或 登入</p>
        </div>
      </div>
    </>
  )
}
