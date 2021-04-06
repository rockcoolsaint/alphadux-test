import mongoose from 'mongoose';
import Contact from '../entities/contact.js';
/**
 * A simple CRUD controller for contacts
 * Create the necessary controller methods 
 */

const all = async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const get = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: 'Contact not found' });
  }
};

const createContact = async (req, res) => {
  //res.send('Post Created');
  const contact = req.body;

  const newContact = new Contact({...contact, createdAt: new Date().toISOString() });
  try {
    await newContact.save();

    res.status(201).json(newContact);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;

  const { phone, creator, address, gender } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No contact with that id');

  const updatedContact = { phone, creator, address, gender, _id: id }; 

  const updates = await Contact.findByIdAndUpdate(id, updatedContact, { new: true });

  res.json(updates);
}

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No contact with that id');

  await Contact.findByIdAndRemove(id);

  res.json({ message: 'Contact deleted successfully' });
}

export default {
    // get all contacts for a user
    all,
    // get a single contact
    get,
    // create a single contact
    createContact,
    // update a single contact
    updateContact,
    // remove a single contact
    deleteContact
}