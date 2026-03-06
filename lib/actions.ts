// app/actions.js
"use server";

export async function submitForm(formData: FormData) {
    const resume = formData.get("resume");
    const jobDesc = formData.get("jobdesc");

    console.log({ resume, jobDesc })
}