// import Link from 'next/link'

export default function SearchForm() {
  return (
    <div className="ms-auto pe-3 mt-3 mt-lg-2">
      <form className="d-flex" role="search">
        <div className="input-group position-relative d-inline-flex align-items-center">
          <input
            type="text"
            className="form-control border-end-0"
            placeholder="搜尋"
            aria-label="from"
            aria-describedby="from"
            style={{
              borderRadius: 2.8,
            }}
          />
          <i
            className="bi bi-search position-absolute"
            role="presentation"
            style={{ right: 10, cursor: 'pointer', zIndex: 100 }}
          ></i>
        </div>
      </form>
    </div>
  )
}
