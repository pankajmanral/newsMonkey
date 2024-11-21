import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

export default class Navbar extends Component {

    render() {

        let {title} = this.props

        return (
        <>
            <nav className={`navbar navbar-expand-lg fixed-top bg-${this.props.mode==='light'?'light':'dark'}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand badge bg-primary fs-6" to="/">{title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className={`nav-link text-${this.props.mode==='light'?'dark':'light'}`} aria-current="page" to="/">Home</Link></li>
                            <li className="nav-item"><Link className={`nav-link text-${this.props.mode==='light'?'dark':'light'}`} to="/business">Business</Link></li>
                            <li className="nav-item"><Link className={`nav-link text-${this.props.mode==='light'?'dark':'light'}`} to="/entertainment">Entertainment</Link></li>
                            <li className="nav-item"><Link className={`nav-link text-${this.props.mode==='light'?'dark':'light'}`} to="/health">Health</Link></li>
                            <li className="nav-item"><Link className={`nav-link text-${this.props.mode==='light'?'dark':'light'}`} to="/science">Science</Link></li>
                            <li className="nav-item"><Link className={`nav-link text-${this.props.mode==='light'?'dark':'light'}`} to="/sports">Sports</Link></li>
                            <li className="nav-item"><Link className={`nav-link text-${this.props.mode==='light'?'dark':'light'}`} to="/technology">Technology</Link></li>
                        </ul>
                    </div>  
                    <form className="d-flex" role="search">
                        <div className="form-check form-switch">
                            <input className="form-check-input" onClick={this.props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                            <label className={`form-check-label text-${this.props.mode==='light'?'dark':'light'}`} htmlFor="flexSwitchCheckDefault">Mode</label>
                        </div>
                    </form>
                </div>
            </nav>
        </>
        )
    }
}
