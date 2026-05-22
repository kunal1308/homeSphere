import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import {
    Pagination,
} from "swiper/modules";

import "swiper/css";

import "swiper/css/pagination";

interface Props {
    images: any[];
}

const ImageSlider = ({
    images,
}: Props) => {
    const safeImages =
        images?.length
            ? images
            : [
                "https://placehold.co/600x400?text=No+Image",
            ];

    return (
        <Swiper
            modules={[
                Pagination,
            ]}
            pagination={{
                clickable: true,
            }}
            spaceBetween={
                0
            }
            slidesPerView={
                1
            }
            style={{
                "--swiper-pagination-color":
                    "#fff",

                "--swiper-pagination-bullet-inactive-color":
                    "#fff",

                "--swiper-pagination-bullet-inactive-opacity":
                    "0.5",
                "--swiper-pagination-bullet-size":
                    "10px",
            } as React.CSSProperties}
        >
            {safeImages?.map(
                (
                    image,
                    index
                ) => (
                    <SwiperSlide
                        key={
                            index
                        }
                    >
                        <img
                            src={
                                image
                            }
                            alt="property"
                            style={{
                                width:
                                    "100%",
                                height:
                                    "220px",
                                objectFit:
                                    "cover",
                                display:
                                    "block",
                                borderTopLeftRadius:
                                    "12px",
                                borderTopRightRadius:
                                    "12px",
                            }}
                        />
                    </SwiperSlide>
                )
            )}
        </Swiper>
    );
};

export default ImageSlider;