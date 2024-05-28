import React from 'react'
import '../sidebar/mystyle.css';
const Mainpanel = () => {
    return (
        <>
            <div>
                <header className="header">Dashboard</header>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="box">Box 1</div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="box">Box 2</div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="box">Box 3</div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="box">Box 4</div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="box">Box 5</div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="box">Box 6</div>
                    </div>
                </div>
                <header className="header">Dashboard</header>
                <div className='container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <div class="column">
                        <div class="box">Box 1</div>
                        <div class="box">Box 2</div>
                        <div class="box">Box 3</div>
                    </div>
                    <div class="column">
                        <div class="box">Box 4</div>
                    </div>
                    <div class="column">
                        <div class="box">Box 5</div>
                        <div class="box">Box 6</div>
                        <div class="box">Box 7</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mainpanel;