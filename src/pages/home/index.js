import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAnimals } from 'actions/animalAction'
import './index.css'
import { Loading } from 'components'
import SlideshowGallery from './slideshowGallery'

function Home({
  loading,
  animals,
  getAnimalPagination
}) {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const onPageSizeChange = (event) => {
    setLimit(event.target.value)
  }
  const handleNext = () => {
    setPage(page => page === animals?.pagination?.total_pages ? page : page + 1)
  }

  const handlePre = () => {
    setPage(page => page === 1 ? 1 :  page - 1)
  }

  useEffect(() => {
    getAnimalPagination({ page, limit })
  }, [page, limit])

  return (
    <div className='home-page'>
      {loading ? (
        <Loading />
      ) : (
        <div className='container'>
          <div className='content'>
            {animals?.animals?.map(item => (
              <div className="inline-block" key={item.id}>
                <div className='image-show'>
                  <SlideshowGallery input={item.photos} />
                </div>
                <h3>{item.name}</h3>
                <p className='text'>{item.description}</p>
                <a href={item.url}>Xem chi tiết</a>
              </div>
            ))}
          </div>
          <div className="pagination">
            <select value={limit} className='select-page-size' onChange={onPageSizeChange}>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span onClick={handlePre}>&laquo;</span>
            {Array(animals?.pagination?.total_pages > 6 ? 6 : animals?.pagination?.total_pages)
              .fill(0)
              .map(( _, item) => {
                const sub = page - 6 > 0 ? page - 6 : 0
                return (
                  <span
                    key={item}
                    className={item + 1 + sub === page ? 'active' : ''}
                    onClick={() => setPage(item + 1 + sub)}
                  >
                    {item + 1 + sub}
                  </span>
                )
              })}
            {animals?.pagination?.total_pages > 6 && page < animals?.pagination?.total_pages && (
              <>
                <span style={{ cursor: 'default' }}>...</span>
                <span className={animals?.pagination?.total_pages === page ? 'active' : ''}
                  onClick={() => setPage(animals?.pagination?.total_pages)}
                >{animals?.pagination?.total_pages}</span>
              </>
            )}
            <span onClick={handleNext}>&raquo;</span>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = store => ({
  loading: store.animal.loading,
  animals: store.animal.animals,
})

const mapDispatchToProps = dispatch => {
  return {
    getAnimalPagination: ({ page, limit }) => {
      dispatch(getAnimals({ page, limit }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
