import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    static defaultProps = {
        category :"sports",
        country :"in"
    }

    static propTypes = {
        category :PropTypes.string ,
        country :PropTypes.string,
        mode :PropTypes.string
    }

    articleArray =  [{
        "source": {
        "id": "associated-press",
        "name": "Associated Press"
        },
        "author": "MARK SHERMAN",
        "title": "The Supreme Court weakens federal regulators, overturning decades-old Chevron decision - The Associated Press",
        "description": "The Supreme Court has upended a 40-year-old decision that made it easier for the federal government to regulate the environment, public health, workplace safety and consumer protections. The court Friday delivered a far-reaching and potentially lucrative vict…",
        "url": "https://apnews.com/article/supreme-court-chevron-regulations-environment-5173bc83d3961a7aaabe415ceaf8d665",
        "urlToImage": "https://dims.apnews.com/dims4/default/cf6b607/2147483647/strip/true/crop/5813x3270+0+303/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F51%2F3f%2F6f0378b6dd9a5236d979f8a34b27%2F28e6b41976cf49d89f356914c289d771",
        "publishedAt": "2024-06-28T14:26:00Z",
        "content": "WASHINGTON (AP) The Supreme Court on Friday upended a 40-year-old decision that made it easier for the federal government to regulate the environment, public health, workplace safety and consumer pro… [+5733 chars]"
        },
        {
        "source": {
        "id": null,
        "name": "Yahoo Entertainment"
        },
        "author": null,
        "title": "Stock market today: Stocks rise as key Fed-watched inflation data keeps cooling - Yahoo Finance",
        "description": null,
        "url": "https://finance.yahoo.com/news/stock-market-today-stocks-rise-as-key-fed-watched-inflation-data-keeps-cooling-133047911.html",
        "urlToImage": null,
        "publishedAt": "2024-06-28T14:24:46Z",
        "content": "If you click 'Accept all', we and our partners, including 237 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
    }]

    constructor(props){
        super(props);
        this.state = ({
            article  :this.articleArray,
            page :1,
            totalResult :0,
            loading:false
        })
        document.title =  `NewsMonkey - ${(this.props.category)}`
    }

    // capitalizeFirstLetter = (string) => {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }

    async componentDidMount(){
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=f89aea20379541c1883ba43aed982e45&category=${this.props.category}`
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=f89aea20379541c1883ba43aed982e45&pageSize=8&category=${this.props.category}`
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        console.log(parsedData)
        this.setState({
            article : parsedData.articles,
            totalResult : parsedData.totalResults
        })
        this.props.setProgress(100)
    }

    // handlePrev = async () =>{
    //     if(this.state.page <= 1){}
    //     else{
    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=0c94dc37fe0d4016bc9712386a88db1e&page=${this.state.page-1}&pageSize=8&category=${this.props.category}`
    //         let data = await fetch(url)
    //         let parsedData = await data.json()
    //         this.setState({
    //             article :parsedData.articles,
    //             page :this.state.page - 1
    //         })
    //     }
    // }

    // handleNext = async () =>{
    //     if(this.state.page + 1 > Math.ceil(this.state.totalResult/8)){}
    //         else{
    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=0c94dc37fe0d4016bc9712386a88db1e&page=${this.state.page + 1}&pageSize=8&category=${this.props.category}`
    //         let data = await fetch(url)
    //         this.setState({loading:true})
    //         let parsedData = await data.json()
    //         this.setState({loading:false})
    //         this.setState({
    //             article :parsedData.articles,
    //             page :this.state.page + 1
    //         }, () =>{
    //             window.scrollTo(0,0)
    //         });
    //     }
    // }

    backToTop = () =>{
        window.scrollTo(0,0)
    }

    fetchMoreData = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=f89aea20379541c1883ba43aed982e45&page=${this.state.page + 1}&pageSize=8&category=${this.props.category}`
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            article : this.state.article.concat(parsedData.articles),
            totalResult : parsedData.totalResults,
            page: this.state.page + 1
        })
    }

    render() {  

        return (
        <>
            <h1 className='text-center' style={{marginTop:"70px", textTransform:"capitalize"}}> DailyNews on {(this.props.category)} </h1>
            {/* this.capitalizeFirstLetter(this.props.category) */}
            <InfiniteScroll
                dataLength={this.state.article.length}
                next={this.fetchMoreData}
                hasMore={this.state.article.length !== this.state.totalResult}
                loader={""}
                >
            <div className="container">
                <div className="row">
                    {this.state.article.map((element)=>{
                        return  <div className="col-md-3 py-3" key={element.url}>
                                    <NewsItem headline={element.title?element.title.slice(0.40):""} description={element.description?element.description.slice(0,80):""} image={element.urlToImage} url={element.url} mode={this.props.mode} author={element.author} date={element.publishedAt} source={element.source.name}/>
                                </div>
                    })}
                </div>
            </div>
            </InfiniteScroll>
           <div className="container d-flex justify-content-end py-4">
           <button type="button" className="btn btn-primary" onClick={this.backToTop}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"></path>
                </svg> Back to Top </button>
           </div>
        </>
        )
    }
}
