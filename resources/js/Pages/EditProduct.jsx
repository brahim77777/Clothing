import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useForm, usePage } from '@inertiajs/react';
import { SketchPicker } from 'react-color';
import { MdColorLens, MdPublish } from 'react-icons/md';
import { Cancel, ClearAll } from '@mui/icons-material';
import Dropdown from '../Components/DropDownT';
import CurrencyInput from 'react-currency-input-field';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import axios from 'axios'; // Import axios
import Dashboard from './Dashboard';
import ModalCat from '@/Components/ModalCat';
import { Toaster, toast } from 'sonner'

import '../../css/app.css';

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageEdit,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType
);

export default function EditProduct({ productId }) {
    const dispatch = useDispatch();
    const selectedCategory = useSelector(state => state.selectedCategory.value);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [files, setFiles] = useState([]);
    const [state, setState] = useState({
        displayColorPicker: false,
        color: [{
            r: '255',
            g: '255',
            b: '255',
            a: '1',
        }]
    });

    const { data, setData, post, progress, reset } = useForm({
        title: '',
        slug: '',
        description: '',
        price: '',
        quantity: '',
        category_id: '',
        secondary_images: [],
        sizes: [],
        colors: [],
        main_image: '',
    });

    useEffect(() => {
        // Fetch existing product data by ID and populate the form fields
        axios.get(`/api/products/${productId}`).then((response) => {
            const product = response.data.product;
            setData({
                title: product.title,
                slug: product.slug,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                category_id: product.category_id,
                secondary_images: product.secondary_images,
                sizes: product.sizes,
                colors: product.colors,
                main_image: product.main_image,
            });
            setSelectedSizes(product.sizes);
            setColors(product.colors.map(color => ({
                r: parseInt(color.slice(1, 3), 16),
                g: parseInt(color.slice(3, 5), 16),
                b: parseInt(color.slice(5, 7), 16),
                a: parseInt(color.slice(7, 9), 16) / 255,
            })));
            setFiles(product.secondary_images.map(image => ({
                source: image,
                options: {
                    type: 'local',
                }
            })));
        });
    }, [productId]);

    useEffect(() => {
        axios.get('/categories').then((res) => {
            setCategories(res.data.categories);
        });
    }, []);

    const handleClick = () => {
        setState({ ...state, displayColorPicker: !state.displayColorPicker });
        if (!colors.some(c => c === state.color) && state.displayColorPicker) {
            handleClose();
        }
    };

    const handleClose = () => {
        setColors([...colors, state.color]);
        setData('colors', rgbToHex(colors));
    };

    const handleChange = (color) => {
        setState({ ...state, color: color.rgb });
    };

    const handleSizeSelection = (e) => {
        e.preventDefault();
        const size = e.currentTarget.value;
        setSelectedSizes((prevSizes) => {
            if (prevSizes.includes(size)) {
                return prevSizes.filter((s) => s !== size);
            } else {
                return [...prevSizes, size];
            }
        });
        setData('sizes', selectedSizes);
    };

    const handleFileProcess = (file) => {
        console.log('File processed:', file);
    };

    const handleUpdateFiles = (fileItems) => {
        setFiles(fileItems.map(fileItem => fileItem.file));
        const avatarFiles = fileItems.map(fileItem => fileItem.file);
        setData('main_image', avatarFiles[0]);
        setData('secondary_images', avatarFiles);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("data transfer: ", data);

        setData('slug', `idnumber${data?.quantity}`);
        console.log("form data: ", data);

        try {
            await axios.put(`/api/products/${productId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(
                (response) => {
                    console.log('Form submitted successfully:', response.data);
                    toast.success('Product updated successfully!', {
                        action: {
                            label: 'OK',
                            onClick: () => console.log('Undo')
                        },
                    });
                },
                (error) => {
                    console.error('Error submitting form:', error);
                    toast.error('Error submitting form!');
                }
            );
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error submitting form!');
        }
    };

    return (
        <Dashboard>
            <Toaster position="top-right" richColors />
            <div className={`w-full duration-300 ease-in-out min-h-screen ${toggleDarkMode ? 'bg-neutral-700' : 'bg-neutral-100'} h-full p-4 ml-auto`}>
                <form onSubmit={handleFormSubmit}>
                    <div className='w-full mb-2 flex justify-between '>
                        <h1 className="text-[1.4rem] font-semibold mb-4">Edit Product</h1>
                        <div className='flex gap-2'>
                            <Link href="/dashboard/products" className='py-2 pl-1 pr-2 border border-[#1C2434] h-fit rounded-md flex text-[#1C2434] items-center gap-1'><Cancel className='size-5' />Cancel</Link>
                            <button className='py-2 pl-1 pr-2 bg-[#1C2434] h-fit rounded-md flex text-white items-center gap-1'><MdPublish className='size-5' />Update</button>
                        </div>
                    </div>

                    <div className='flex max-lg:flex-col left-full gap-4 '>
                        <div className='w-full bg-white p-4 rounded-md'>
                            <h2 className="mb-2 text-lg">General Information</h2>
                            <div className='w-full flex flex-col gap-2 mb-4'>
                                <label>Upload product Image(s)</label>
                                <FilePond
                                    files={files}
                                    allowMultiple={true}
                                    maxFiles={6}
                                    onupdatefiles={handleUpdateFiles}
                                    server={{
                                        process: {
                                            url: '/upload', // Update the process URL to the correct route
                                            method: 'POST',
                                            withCredentials: true,
                                            headers: {
                                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                                            }
                                        }
                                    }}
                                    onprocessfile={handleFileProcess}
                                    name="main_image"
                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                />
                            </div>
                            <div className="grid grid-cols-3 max-md:grid-cols-2 gap-4 mb-4 flex-wrap">
                                <div className="flex flex-col gap-2 ">
                                    <label htmlFor="pn">Product Name</label>
                                    <input required name='title' id="pn" className="p-2 border border-neutral-300 rounded" type="text" placeholder="type cloth name" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-2 ">
                                    <label>Categories</label>
                                    <Dropdown Items={categories} selectedItem={data.category_id} />
                                </div>
                                <div className="flex flex-col justify-end gap-2 w-fit text-nowrap mb-[2.5px]">
                                    <ModalCat />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label>Description</label>
                                <textarea className="p-2 border border-neutral-300 rounded" name="description" cols={30} rows={5} value={data.description} onChange={(e) => setData('description', e.target.value)} />
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
                                <div className="flex flex-col gap-2 ">
                                    <label htmlFor="sl">Sale Price</label>
                                    <CurrencyInput id='sl' placeholder='220DH' className="p-2 border border-neutral-300 rounded" suffix="DH" value={data.price} onValueChange={(value, name, values) => setData('price', value)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="qn">Quantity </label>
                                    <input id='qn' type='number' placeholder='20' className="p-2 border border-neutral-300 rounded" value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full mb-4">
                                <label htmlFor="sl">Select size(s)</label>
                                <div className='flex gap-2'>
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <button key={size} onClick={(e) => handleSizeSelection(e)} value={size} className={`${selectedSizes.includes(size) ? 'border-gray-800 text-black border-2' : 'text-zinc-400 bg-gray-100'} p-1 border rounded min-w-8 text-center border-neutral-400`}>{size}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-2 mb-4 pb-4">
                                <label htmlFor="co">Select Color(s)</label>
                                <div className='relative '>
                                    <button
                                        className={`rounded pb-4 h-[30px] w-full  border ${toggleDarkMode ? 'bg-neutral-700 text-white' : 'bg-neutral-100 text-black'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleClick();
                                        }}>
                                        <MdColorLens className='inline-block align-middle' /><span className='inline-block align-middle'>Choose a Color</span></button>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        setColors([]);
                                    }}><ClearAll className=' border border-neutral-800 rounded' /></button>
                                    {state.displayColorPicker ? (
                                        <div className='absolute z-50'>
                                            <div className='fixed top-0 right-0 bottom-0 left-0' onClick={handleClick} />
                                            <SketchPicker color={state.color} onChange={handleChange} />
                                        </div>
                                    ) : null}
                                </div>
                                <div className='flex gap-2 flex-wrap'>
                                    {colors.map((color, index) => (
                                        <div key={index} className="p-2 border rounded" style={{ backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})` }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
}
