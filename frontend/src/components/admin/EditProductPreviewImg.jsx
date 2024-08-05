import React from 'react'

const EditProductPreviewImg = ({  previewImg, setPreviewImg, setImages, images, setOldImages, oldImages }) => {

    const imageHandler = (e) => {
        let files = e.target.files

        Array.from(files).forEach((img) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            setImages((oldArray) => [...oldArray, {
                name: uniqueSuffix,
                img,

            }])
            setPreviewImg((oldArray) => [...oldArray, {
                name: uniqueSuffix,
                url: URL.createObjectURL(img),
                imgType: "newImage"
            }])
        })


    }

    const deleteImageHandler = ({ filename, imgType }) => {
        const filteredImage = images.filter((img) => img.name != filename);
        const filteredPreviewImage = previewImg.filter((img) => img.name != filename);
        setPreviewImg(filteredPreviewImage);
        setImages(filteredImage)
        if (imgType == "oldImage") {
            const filteredOldImage = oldImages.filter((img) => img.name != filename);
            setOldImages(filteredOldImage)
        }
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
                placeholder="Please Enter Your Product Image"
                multiple
                onChange={(e) => imageHandler(e)}
            />
        </div>
        <div className='pt-3 row'>
            {previewImg.length != 0 ? previewImg.map((img) => (
                <div className='col-3 p-2'>
                    <div className='previewImg cursor-pointer' onClick={() => deleteImageHandler({ filename: img.name, imgType: img.imgType })}>
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

export default EditProductPreviewImg
