import React from 'react'

const AddProductPreviewImg = ({ images, previewImg, setPreviewImg, setImages, ref }) => {

    const imageHandler = (e) => {
        let files = e.target.files

        Array.from(files).forEach((img) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            setImages((oldArray) => [...oldArray, {
                name: uniqueSuffix,
                img
            }])
            setPreviewImg((oldArray) => [...oldArray, {
                name: uniqueSuffix,
                url: URL.createObjectURL(img)
            }])
        })
    }


    const deleteImageHandler = (filename) => {
        const filteredImage = images.filter((img) => img.name != filename);
        const filteredPreviewImage = previewImg.filter((img) => img.name != filename);
        setPreviewImg(filteredPreviewImage);
        setImages(filteredImage)
    }
    return (<>
        <div className="pt-3">
            <label htmlFor="" className="form-label fw-bold">
                Product Image
            </label>
            <input
                className="form-control rounded-0"
                type="file"
                name="image"
                ref={ref}
                placeholder="Please Enter Your Product Image"
                multiple
                onChange={(e) => imageHandler(e)}
            />
        </div>
        <div className='pt-3 row'>
            {previewImg.length != 0 ? previewImg.map((img) => (
                <div className='col-3 p-2'>
                    <div className='previewImg cursor-pointer' onClick={() => deleteImageHandler(img.name)}>
                        <img src={img.url} className='img-fluid previewImgSrc' alt="" />
                        <div className='previewImgDelete'>
                            <i className='fa-solid fa-x fa-2x'></i>
                        </div>
                    </div>
                </div>
            )) : ""}
        </div>
    </>
    )
}

export default AddProductPreviewImg
