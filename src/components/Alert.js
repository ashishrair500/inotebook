import React from 'react'

const Alert = (props) => {
    const capitalize=(word)=>{
      if (word==="danger"){
          word ="Error"
      }

    }
    return (
        <div style={{height:'50px'}}>
        {props.alert &&
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>{props.alert.Type}</strong>:{props.alert.msg}
      </div>}
    </div>
    )
}

export default Alert

