'use client'
import Image from 'next/image';
import { IoLogoLinkedin, IoSend, IoRefreshOutline } from 'react-icons/io5';
import LoadingPosting from '../LoadingPosting';
import IsPosted from '../IsPosted';
import { RootState } from '@/redux/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

interface Message {
    content: string;
}

interface Creator {
    messages: Message[];
}

interface DataItem {
    linkedin_content_creator?: Creator;
}

const WindowLinkedIn = () => {
    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [isApprovedImage, setIsApprovedImage] = useState<boolean>(false);
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const content = useSelector((state: RootState) => state.contentCreation.content);
    const [editableContent, setEditableContent] = useState<string>('No se pudo obtener el contenido de LinkedIn');

    const [posted, setPosted] = useState<boolean>(false);

    if (typeof content === 'string') {
        try {
            const data: DataItem[] = JSON.parse(content);
            const linkedinObj = data.find((item) => item.linkedin_content_creator);
            if (linkedinObj?.linkedin_content_creator?.messages?.[0]?.content) {
                if (editableContent === 'No se pudo obtener el contenido de LinkedIn') {
                    setEditableContent(linkedinObj.linkedin_content_creator.messages[0].content);
                }
            }
        } catch (error) {
            console.error("Error al parsear el contenido:", error);
        }
    } else if (Array.isArray(content)) {
        const data: DataItem[] = content;
        const linkedinObj = data.find((item) => item.linkedin_content_creator);
        if (linkedinObj?.linkedin_content_creator?.messages?.[0]?.content) {
            if (editableContent === 'No se pudo obtener el contenido de LinkedIn') {
                setEditableContent(linkedinObj.linkedin_content_creator.messages[0].content);
            }
        }
    }

    const handleApprove = () => {
        console.log("Contenido aprobado:", editableContent);
        setIsApproved(true);
    };

    const handleRegenerate = () => {
        console.log("Regenerando contenido...");
        setIsApproved(false);
        console.log("Regenerando contenido...");
        setIsApprovedImage(false);
        // Aquí puedes implementar lógica para regenerar el contenido
    };
    const handleApproveImage = () => {
        console.log("Contenido aprobado:", editableContent);
        setIsApprovedImage(true);
    };

    const handleRegenerateImage = () => {
        console.log("Regenerando contenido...");
        setIsApprovedImage(false);
        // Aquí puedes implementar lógica para regenerar el contenido
    };

    const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0');
   
    const [error, setError] = useState('');
    const handlePosting = async () => {
        console.log("Publicando contenido...");
        setIsPosting(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/publish/instagram', {
                image_url: imageUrl,
                caption: editableContent
            });

            console.log('Respuesta:', response.data);
            setPosted(true);
        } catch (error) {
            console.error('Error al publicar:', error);
            setError('Error al publicar en Instagram. Intenta nuevamente.');
        } finally {
            setIsPosting(false);
        }
    };
    return (
        <div className='overflow-y-scroll w-full mb-2 sticky h-full top-0 z-50 border p-2 shadow-lg border-base-200 rounded-lg bg-base-100' >
            {isPosting ? (
                <LoadingPosting />
            ) : posted ? (
                <IsPosted />
            ) : (
                <div className='overflow-y-scroll w-full p-2 flex flex-col gap-10'>
                    <div>
                        <h3 className="text-xl font-bold text-purple-500 ">1. Contenido sugerido</h3>
                        <p className="text-sm dark:text-gray-300 italic ">
                            Este es el contenido sugerido por el modelo. Puedes editarlo o regenerarlo hasta que logres el resultado deseado.
                            Una vez aprobado, se utilizará para generar la imagen de la publicación.
                        </p>
                        <div className='flex flex-col gap-4 mt-4'>
                            <textarea
                                className="textarea textarea-bordered w-full dark:bg-base-200  bg-gray-50 shadow-sm border border-gray-100 dark:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={editableContent}
                                onChange={(e) => setEditableContent(e.target.value)}
                                rows={10}
                            />
                            <div className="flex gap-4">
                                <button
                                    className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition'
                                    onClick={handleApprove}
                                >
                                    Aprobar y generar imagen
                                </button>
                                <button
                                    className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center gap-2'
                                    onClick={handleRegenerate}
                                >
                                    <IoRefreshOutline size={18} />
                                    Regenerar contenido
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div>
                            <h3 className="text-xl font-bold text-purple-500">2. Imagen generada a partir del contenido</h3>
                            <p className="text-sm dark:text-gray-300 italic ">
                                La imagen es creada automáticamente usando el contenido aprobado. Puedes regenerarla si no cumple con tus expectativas o aprobarla para finalizar este paso.
                            </p>
                            <div className="border border-dashed border-gray-400 mt-4 p-4 flex items-center justify-center  bg-gray-100 shadow-sm dark:bg-base-200 text-gray-100 rounded-md ">
                                {isApproved ? (
                                    <div className='w-full h-full relative flex flex-col gap-4'>
                                        <Image
                                            src={"https://my-page-negiupp.s3.amazonaws.com/1733502993844.jpg"}
                                            width={500}
                                            height={500}
                                            alt='Imagen generada'
                                            objectFit='contain'
                                            className='rounded-md object-contain  mx-auto '
                                        />
                                    </div>
                                ) : (
                                    <p className='dark:text-white text-black'>Aquí irá la imagen generada a partir del contenido aprobado</p>
                                )}
                            </div>
                        </div>

                        {isApproved && (<>
                            <div className="flex gap-4">
                                <button
                                    className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition'
                                    onClick={handleApproveImage}
                                >
                                    Aprobar imagen
                                </button>
                                <button
                                    className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center gap-2'
                                    onClick={handleRegenerateImage}
                                >
                                    <IoRefreshOutline size={18} />
                                    Regenerar imagen
                                </button>
                            </div>
                        </>)}
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-purple-500">3. Vista previa de la publicación en LinkedIn</h3>
                        <p className="text-sm dark:text-gray-300 italic ">
                            Esta es una simulación de cómo se verá tu publicación en LinkedIn. Incluye el contenido aprobado y la imagen generada para que puedas visualizar el resultado final.
                        </p>
                        <div className="border border-dashed border-gray-400 mt-4 p-4 flex items-center justify-center  bg-gray-100 shadow-sm dark:bg-base-200 text-gray-100 rounded-md ">
                            {isApprovedImage ? (
                                <div className='flex flex-col gap-4'>
                                    <div className=" max-w-lg mx-auto rounded-md bg-white shadow-md ">
                                        <div className="flex items-center gap-4 mb-4 px-4 ">
                                            <Image
                                                src="https://my-page-negiupp.s3.amazonaws.com/1734680939306.jpeg"
                                                alt="Avatar del autor"
                                                width={50}
                                                height={50}
                                                className="rounded-full"
                                            />
                                            <div>
                                                <p className="font-bold text-gray-800">Juan Sebastián Suárez</p>
                                                <p className="text-sm text-gray-500">Desarrollador Full-Stack en PandorAI</p>
                                            </div>
                                        </div>
                                        <div className="mb-4 px-4">
                                            <p className="text-gray-700">{editableContent}</p>
                                        </div>
                                        <div className="w-full">
                                            <Image
                                                src={"https://my-page-negiupp.s3.amazonaws.com/1733502993844.jpg"}
                                                alt="Vista previa de LinkedIn"
                                                width={700}
                                                height={400}
                                                className="object-contain mx-auto"
                                            />
                                        </div>
                                        <div className="mt-4 flex gap-4 text-sm text-gray-500 p-4">
                                            <p>👍 120</p>
                                            <p>💬 25 comentarios</p>
                                            <p>🔄 10 compartidos</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className='dark:text-white text-black'>Aquí irá la vista previa de la publicación en LinkedIn</p>
                            )}
                        </div>
                        {isApprovedImage && (

                            <div className='flex justify-center items-center mt-4 max-w-lg mx-auto'>
                                <button onClick={() => handlePosting()} className=' p-2 px-4 bg-purple-500 text-white border-none rounded-md '>
                                    Post
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    )
}

export default WindowLinkedIn