import {
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
    getDocs,
    collection,
    query,
    where,
} from "firebase/firestore";

import { auth } from "../firebase/config";

import { db } from "../firebase/config";

export const createProperty = async (
    propertyData: any
) => {
    const docRef = await addDoc(
        collection(db, "properties"),
        propertyData
    );

    return docRef;
};

export const createDraftProperty =
    async (
        data: any
    ) => {
        const docRef =
            await addDoc(
                collection(
                    db,
                    "properties"
                ),
                {
                    ...data,

                    status: "draft",

                    createdAt:
                        serverTimestamp(),
                }
            );

        return docRef.id;
    };

export const updateDraftProperty =
    async (
        propertyId: string,
        data: any
    ) => {
        const propertyRef =
            doc(
                db,
                "properties",
                propertyId
            );

        await updateDoc(
            propertyRef,
            {
                ...data,

                updatedAt:
                    serverTimestamp(),
            }
        );
    };

export const getProperties =
    async () => {
        const querySnapshot =
            await getDocs(
                collection(db, "properties")
            );

        const properties: any[] = [];

        querySnapshot.forEach((doc) => {
            properties.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return properties;
    };

export const getMyProperties =
    async () => {
        const q = query(
            collection(
                db,
                "properties"
            ),

            where(
                "ownerId",
                "==",
                auth.currentUser?.uid
            )
        );

        const snapshot =
            await getDocs(q);

        return snapshot.docs.map(
            (doc) => ({
                id: doc.id,
                ...doc.data(),
            })
        );
    };

export const uploadPropertyImages =
    async (
        files: File[]
    ) => {
        try {
            console.log(
                "FILES:",
                files
            );

            const urls =
                await Promise.all(
                    files.map(
                        async (file) => {
                            const formData =
                                new FormData();

                            formData.append(
                                "file",
                                file
                            );

                            formData.append(
                                "upload_preset",
                                "homesphere_upload"
                            );

                            console.log(
                                "UPLOADING:",
                                file.name
                            );

                            const response =
                                await fetch(
                                    "https://api.cloudinary.com/v1_1/dly7cq42h/image/upload",
                                    {
                                        method:
                                            "POST",

                                        body: formData,
                                    }
                                );

                            const data =
                                await response.json();

                            console.log(
                                "CLOUDINARY RESPONSE:",
                                data
                            );

                            return data.secure_url;
                        }
                    )
                );

            console.log(
                "FINAL URLS:",
                urls
            );

            return urls;
        } catch (error) {
            console.log(
                "UPLOAD ERROR:",
                error
            );

            throw error;
        }
    };

export const applyForProperty =
    async (
        property: any
    ) => {
        if (!auth.currentUser)
            return;

        // CHECK EXISTING APPLICATION
        const q = query(
            collection(
                db,
                "applications"
            ),

            where(
                "propertyId",
                "==",
                property.id
            ),

            where(
                "tenantId",
                "==",
                auth.currentUser.uid
            )
        );

        const existing =
            await getDocs(q);

        if (
            !existing.empty
        ) {
            throw new Error(
                "Already applied"
            );
        }

        // CREATE APPLICATION
        await addDoc(
            collection(
                db,
                "applications"
            ),
            {
                propertyId:
                    property.id,

                propertyTitle:
                    property.title,

                propertyImage:
                    property
                        ?.images?.[0] ||
                    "",

                propertyLocation:
                    property.location,

                propertyPrice:
                    property.price,

                ownerId:
                    property.ownerId,

                tenantId:
                    auth.currentUser
                        .uid,

                tenantName:
                    auth.currentUser
                        .displayName ||
                    auth.currentUser.email?.split(
                        "@"
                    )[0],

                tenantEmail:
                    auth.currentUser
                        .email,

                status:
                    "pending",

                createdAt:
                    serverTimestamp(),
            }
        );
    };

export const getTenantApplications =
    async () => {
        if (
            !auth.currentUser
        )
            return [];

        const q = query(
            collection(
                db,
                "applications"
            ),

            where(
                "tenantId",
                "==",
                auth.currentUser.uid
            )
        );

        const snapshot =
            await getDocs(q);

        return snapshot.docs.map(
            (doc) => ({
                id: doc.id,
                ...doc.data(),
            })
        );
    };

export const getOwnerApplications =
    async () => {
        if (
            !auth.currentUser
        )
            return [];

        const q = query(
            collection(
                db,
                "applications"
            ),

            where(
                "ownerId",
                "==",
                auth.currentUser.uid
            )
        );

        const snapshot =
            await getDocs(q);

        return snapshot.docs.map(
            (doc) => ({
                id: doc.id,
                ...doc.data(),
            })
        );
    };

export const updateApplicationStatus =
    async (
        applicationId: string,
        status:
            | "approved"
            | "rejected"
    ) => {
        const applicationRef =
            doc(
                db,
                "applications",
                applicationId
            );

        await updateDoc(
            applicationRef,
            {
                status,
            }
        );
    };