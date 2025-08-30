function CarouselSlide({slide_no,img,total_slide}){

  return(
   
  <div id= {`slide${slide_no}`} className="carousel-item flex flex-col justify-center items-center relative w-full" >
                <img
                src={img}
                className=" h-[20vh] w-40 rounded-[100%] " />
                <h3>Quote</h3>
                <div className="absolute left-30 right-30 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${(slide_no>1)? slide_no-1:total_slide }`} className="btn btn-circle">❮</a>
                <a href={`#slide${ (slide_no==total_slide)?1:slide_no+1 }`} className="btn btn-circle">❯</a>
                </div>
            </div>
        
  );
}
export default CarouselSlide;