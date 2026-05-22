import { useState } from "react";
import { addProperty } from "../services/propertyService";
import { toast } from "react-toastify";

const AddProperty = () => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async () => {
        try {
            await addProperty({
                title,
                location,
                price,
                imageUrl:
                    "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
            });

            toast.success("Property Added");

            setTitle("");
            setLocation("");
            setPrice("");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Add Property</h1>

            <input
                type="text"
                placeholder="Property Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <br />
            <br />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <br />
            <br />

            <button onClick={handleSubmit}>
                Add Property
            </button>
        </div>
    );
};

export default AddProperty;