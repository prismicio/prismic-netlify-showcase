import React from 'react'
import Loadable from 'react-loadable'

function loading(props) {
  if (props.error) {
    console.error(props.error)
    return <div>Error! {props.error.message}<button onClick={ props.retry }>Retry</button></div>
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>
  } else if (props.pastDelay) {
    return ''
  } else {
    return null
  }
}

export const asyncImport = importFn => Loadable({
  loader: () => importFn,
  delay: 200,
  timeout: 10000,
  loading
})
