import CurrencyInput from 'react-currency-input-field';
import '../../css/app.css';
import { SketchPicker } from 'react-color';
import React, { useEffect, useState, useCallback } from 'react';
import { MdColorLens, MdPublish } from 'react-icons/md';
import { Cancel } from '@mui/icons-material';
import { TbClearAll } from 'react-icons/tb';
import Dropdown from '../Components/DropDownT';
import ModalCat from "../Components/ModalCat"
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

export default function AddProduct({ toggleDarkMode }) {
    const dispatch = useDispatch();
    const selectedCategory = useSelector(state => state.selectedCategory.value);
    const refreshCategoriesState = useSelector(state => state.refreshCategoriesState.value);
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [state, setState] = useState({
        displayColorPicker: false,
        color: { r: '255', g: '255', b: '255', a: '1' }
    });

    const { data, setData, post, progress } = useForm({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category_id: selectedCategory?.id || '',
        sizes: [],
        colors: [],
        avatars: [],
    });

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
        formData.append('name', data.name);
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
                        <div className='flex max-lg:flex-col left-full gap-4'>
                            <div className='w-full bg-white p-4 rounded-md'>
                                <h2 className="mb-2 text-lg">General Information</h2>
                                <div className="grid grid-cols-3 max-md:grid-cols-2 gap-4 mb-4 flex-wrap">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="pn">Product Name</label>
                                        <input required name='name' id="pn" className="p-2 border border-neutral-300 rounded" type="text" placeholder="type cloth name" onChange={(e) => setData('name', e.target.value)} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Categories</label>
                                        <Dropdown Items={categories} selected={data.category_id} onChange={(value) => setData('category_id', value)} />
                                    </div>
                                    <div className="flex flex-col justify-end gap-2 w-fit text-nowrap mb-[2.5px]">
                                        <ModalCat />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Description</label>
                                    <textarea className="p-2 border border-neutral-300 rounded" name="description" cols={30} rows={5} onChange={(e) => setData('description', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="sl">Sale Price</label>
                                        <CurrencyInput id='sl' placeholder='220DH' className="p-2 border border-neutral-300 rounded" suffix="DH" onValueChange={(value) => setData('price', value)} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="qn">Quantity</label>
                                        <input id='qn' type='number' placeholder='20' className="p-2 border border-neutral-300 rounded" onChange={(e) => setData('quantity', e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full mb-4">
                                    <label htmlFor="sl">Select size(s)</label>
                                    <div className='flex gap-2'>
                                        {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => (
                                            <button key={size} onClick={handleSizeSelection} value={size} className={`${selectedSizes.includes(size) ? 'border-gray-800 text-black border-2' : 'text-zinc-400 bg-gray-100'} p-1 border rounded min-w-8 text-center border-neutral-400`}>{size}</button>
                                        ))}
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
