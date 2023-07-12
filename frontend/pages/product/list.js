import { useEffect } from 'react'

export default function List() {
  // Toggle the side navigation
  useEffect(() => {
    // fix next issue
    if (typeof window !== 'undefined') {
      const sidebarToggle = document.body.querySelector('#sidebarToggle')

      if (sidebarToggle) {
        // 在localStorage中儲存目前sidebar情況
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
          document.body.classList.toggle('sb-sidenav-toggled')
        }

        sidebarToggle.addEventListener('click', (event) => {
          event.preventDefault()

          document.body.classList.toggle('sb-sidenav-toggled')

          localStorage.setItem(
            'sb|sidebar-toggle',
            document.body.classList.contains('sb-sidenav-toggled')
          )
        })
      }
    }
  }, [])

  return (
    <>
      <div className="row mt-2 mb-3">
        <h5 className="card-text d-flex justify-content-between align-items-center">
          <span className="ps-3">Nike Air Force 1 (91)</span>
          <div className="d-flex p-2 justify-content-end align-items-center">
            <div className="toolbar">
              <button className="btn" id="sidebarToggle">
                隱藏篩選條件 <i className="bi bi-toggles"></i>
              </button>
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                排序依據
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    最新
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    價格：由高至低
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    價格：由低至高
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </h5>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="d-flex" id="wrapper">
            <div className="bg-white me-3" id="sidebar-wrapper">
              <div className="scroll">
                <div className="cats">
                  <div>
                    <button type="button" className="btn">
                      運動生活
                    </button>
                  </div>
                  <div>
                    <button type="button" className="btn">
                      當季新品
                    </button>
                  </div>
                  <div>
                    <button type="button" className="btn">
                      促銷
                    </button>
                  </div>
                </div>

                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        性別
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body px-1">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            男性
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            checked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            女性
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            checked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            中性
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        顏色
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body px-1">
                        <div className="d-flex flex-row justify-content-around mb-2">
                          <div className="p-2">
                            <div className="d-flex flex-column">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-circle"
                                ></button>
                              </div>
                              <div className="color-f">紫色</div>
                            </div>
                          </div>
                          <div className="p-2">
                            <div className="d-flex flex-column">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-circle"
                                ></button>
                              </div>
                              <div className="color-f">紫色</div>
                            </div>
                          </div>
                          <div className="p-2">
                            <div className="d-flex flex-column">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-circle"
                                ></button>
                              </div>
                              <div className="color-f">紫色</div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-row justify-content-around mb-2">
                          <div className="p-2">
                            <div className="d-flex flex-column">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-circle"
                                ></button>
                              </div>
                              <div className="color-f">紫色</div>
                            </div>
                          </div>
                          <div className="p-2">
                            <div className="d-flex flex-column">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-circle"
                                ></button>
                              </div>
                              <div className="color-f">紫色</div>
                            </div>
                          </div>
                          <div className="p-2">
                            <div className="d-flex flex-column">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-circle"
                                ></button>
                              </div>
                              <div className="color-f">紫色</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        價格範圍
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseThree"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body px-1">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            $1,500以下
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            checked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            $1,500 - $3,000
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            checked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            $3,001 - $5,999
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="page-content-wrapper">
              <div className="container-fluid">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  <div className="col">
                    <div className="card w-350 no-border f-16">
                      <img
                        src="/images/1.webp"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body no-space-x">
                        <p className="card-text note-text">新品上市</p>
                        <p className="card-text">Nike Air Force 1 Shadow</p>
                        <p className="card-text type-text">女鞋</p>
                        <p className="card-text type-text mb-2">3 種顏色</p>
                        <span className="h-currency bold h-now">$1,990</span>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card w-350 no-border f-16">
                      <img
                        src="/images/1.webp"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body no-space-x">
                        <p className="card-text note-text">新品上市</p>
                        <p className="card-text">Nike Air Force 1 Shadow</p>
                        <p className="card-text type-text">女鞋</p>
                        <p className="card-text type-text mb-2">3 種顏色</p>
                        <span className="h-currency bold h-now">$1,990</span>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card w-350 no-border f-16">
                      <img
                        src="/images/1.webp"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body no-space-x">
                        <p className="card-text note-text">新品上市</p>
                        <p className="card-text">Nike Air Force 1 Shadow</p>
                        <p className="card-text type-text">女鞋</p>
                        <p className="card-text type-text mb-2">3 種顏色</p>
                        <span className="h-currency bold h-now">$1,990</span>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="card w-350 no-border f-16">
                      <img
                        src="/images/1.webp"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body no-space-x">
                        <p className="card-text note-text">新品上市</p>
                        <p className="card-text">Nike Air Force 1 Shadow</p>
                        <p className="card-text type-text">女鞋</p>
                        <p className="card-text type-text mb-2">3 種顏色</p>
                        <span className="h-currency bold h-now">$1,990</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
