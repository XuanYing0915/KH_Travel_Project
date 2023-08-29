import Link from 'next/link'

export default function HomeCard2({
  id = 1,
  img_src = '',
  name = '',
  towheresrc = '#',
  imgrouter = ''
}) {

  const img = `/images/${imgrouter}/${img_src}`

  return (
    <>
      {/* card本體 */}
      <div className=" homepageCard2" key={id}>
        <Link href={towheresrc} style={{ height: '100%' }}>
          <div className={'imgbox'}>
            <img
              src={img}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              alt={name}
            />
          </div>

          {/* 下層文字框架及icon  上+下*/}
          <div className="textbox">
            {/* title */}
            <p className={' fw-bold'} >
              {name}
            </p>

          </div>
        </Link>
      </div>
    </>
  )
}
