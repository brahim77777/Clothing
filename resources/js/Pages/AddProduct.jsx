import CurrencyInput from 'react-currency-input-field';
import '../../css/app.css';
import { SketchPicker } from 'react-color';
import React, { useEffect, useState } from 'react';
import { MdColorLens, MdPublish } from 'react-icons/md';
import { Cancel } from '@mui/icons-material';
import { TbClearAll } from 'react-icons/tb';
import DropDown from '../Components/DropDownT';
import ModalCat from "../Components/ModalCat";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useForm } from '@inertiajs/react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import Dashboard from './Dashboard';
import axios from 'axios';

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageEdit,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType
);

export default function AddProduct() {
    const selectedCategory = useSelector(state => state.selectedCategories.value);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState([]);
    const [colors, setColors] = useState([]);
    const [state, setState] = useState({
        displayColorPicker: false,
        color: { r: '255', g: '255', b: '255', a: '1' }
    });
    const { data, setData, post, progress } = useForm({
        title: '',
        description: '',
        price: '',
        quantity: '',
        category_id: '',
        sizes: [],
        colors: [],
        avatars: [],
    });
    const toggleDarkMode = useSelector((state) => state.changeTheme.value);
    const refreshCategoriesState = useSelector(state => state.refreshCategoriesState.value);

    useEffect(() => {
        axios.get('/categories').then((res) => {
            setCategories(res.data.categories);
        });
    }, [refreshCategoriesState]);

    useEffect(() => {
        if (selectedCategory) {
            setData('category_id', selectedCategory.id);
        }
    }, [selectedCategory]);

    const handleClick = () => {
        setState({ ...state, displayColorPicker: !state.displayColorPicker });
        if (!colors.some(c => c === state.color) && state.displayColorPicker) {
            handleClose();
        }
    };

    const handleClose = () => {
        setColors([...colors, state.color]);
        setData('colors', [...colors, state.color]);
    };

    const handleChange = (color) => {
        setState({ ...state, color: color.rgb });
    };

    const handleSizeSelection = (e) => {
        e.preventDefault();
        const size = e.currentTarget.value;
        setSelectedSizes((prevSizes) => {
            const newSizes = prevSizes.includes(size) ? prevSizes.filter((s) => s !== size) : [...prevSizes, size];
            setData('sizes', newSizes);
            return newSizes;
        });
    };

    const handleFileUpdate = (fileItems) => {
        const files = fileItems.map(fileItem => fileItem.file);
        setData('avatars', files);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        formData.append('category_id', data.category_id);
        formData.append('sizes', JSON.stringify(data.sizes));
        formData.append('colors', JSON.stringify(data.colors));
        data.avatars.forEach((file, index) => {
            formData.append(`avatars[${index}]`, file);
        });

        axios.post('/product', formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Dashboard>
            <div className={`w-full duration-300 ease-in-out min-h-screen ${toggleDarkMode ? 'bg-neutral-700' : 'bg-neutral-100'} h-full p-4 ml-auto`}>
                <form onSubmit={handleFormSubmit}>
                    <div className='w-full mb-2 flex justify-between'>
                        <h1 className="text-[1.4rem] font-semibold mb-4">Add a New Product</h1>
                        <div className='flex gap-2'>
                            <Link href="/dashboard/products" className='py-2 pl-1 pr-2 border border-[#1C2434] h-fit rounded-md flex text-[#1C2434] items-center gap-1'>
                                <Cancel className='size-5' />Cancel
                            </Link>
                            <button className='py-2 pl-1 pr-2 bg-[#1C2434] h-fit rounded-md flex text-white items-center gap-1'>
                                <MdPublish className='size-5' />Publish
                            </button>
                        </div>
                    </div>

                    <div className=''>
                        <div className='flex max-lg:flex-col-reverse justify-between gap-2'>
                            <div className={`p-4 ${toggleDarkMode ? 'bg-[#171D2A]' : 'bg-white'} rounded-md w-full flex flex-col gap-4`}>
                                <div className='w-full'>
                                    <label htmlFor="title">Product Name</label>
                                    <input type="text" id="title" value={data.title} onChange={e => setData('title', e.target.value)} className='border-neutral-400 w-full' />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="description">Description</label>
                                    <textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} className='border-neutral-400 w-full'></textarea>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="price">Price</label>
                                    <CurrencyInput
                                        id="price"
                                        name="price"
                                        prefix="$"
                                        defaultValue={data.price}
                                        decimalsLimit={2}
                                        className='border-neutral-400 w-full'
                                        onValueChange={(value) => setData('price', value)}
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="quantity">Quantity</label>
                                    <input type="number" id="quantity" value={data.quantity} onChange={e => setData('quantity', e.target.value)} className='border-neutral-400 w-full' />
                                </div>
                                <div className='w-full flex justify-between'>
                                    <div className='w-full'>
                                        <label htmlFor="cp">Sizes</label>
                                        <div className='flex flex-col'>
                                            <div className="flex justify-between">
                                                {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size, index) => (
                                                    <button
                                                        key={index}
                                                        className={`p-2 border border-neutral-400 rounded-md w-10 h-10 flex justify-center items-center ${selectedSizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                                        value={size}
                                                        onClick={handleSizeSelection}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <div className="w-full flex flex-col gap-2">
                                        <label htmlFor="category">Category</label>
                                        <div className="w-full">
                                            <DropDown Items={categories} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="cp">Colors</label>
                                    <div className='flex flex-col'>
                                        <button type='button' className='flex items-center gap-1 w-fit p-1 border border-neutral-400 rounded-md' onClick={handleClick}>
                                            <MdColorLens className='size-4' />Pick color
                                        </button>
                                        {state.displayColorPicker && (
                                            <div className='absolute z-10'>
                                                <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
                                                <SketchPicker color={state.color} onChange={handleChange} />
                                            </div>
                                        )}
                                        <div className='flex gap-1'>
                                            {colors.map((color, index) => (
                                                <div key={index} style={{ background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }} className='w-5 h-5 rounded-full border-2 border-black' />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-white p-4 rounded-md">
                                <h2 className="mb-2 text-lg">Upload Images</h2>
                                <FilePond
                                    files={files}
                                    onupdatefiles={handleFileUpdate}
                                    allowMultiple={true}
                                    maxFiles={4}
                                    name="avatars"
                                    labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'
                                    acceptedFileTypes={['image/*']}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
}
