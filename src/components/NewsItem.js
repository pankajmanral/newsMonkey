import React, { Component } from 'react'
import './newsitem.css'

export default class NewsItem extends Component {
    render() {

        let{headline,description,image,url} = this.props

        return (
            <>
                <div className={`card bg-${this.props.mode==='light'?'light':'dark'} text-${this.props.mode==='light'?'dark':'light'}`} style={{width: "20rem"}}>
                <span className="source-name position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {this.props.source}
                            </span>
                    <img src={image?image:"https://images.moneycontrol.com/static-mcnews/2022/03/385817382.jpg"} className="card-img card-img-top" alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">{headline}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className={`text-${this.props.mode==='light'?'dark':'ligth'}`}>By {this.props.author?this.props.author:"UnKnown"} on {new Date(this.props.date).toDateString()}</small></p>
                        <a href={url} target='__blank' className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}
