import Contact from '../controllers/contact';
import auth from '../middleware/auth.js';
/**
 * 
 * 
 */
module.exports = app => {
    // app.route('/contact/all').get(Contact.all);
    /**
     * Create the remaining routes
     * get,
     * create,
     * delete,
     * update,
     * remove
     */
    app.route('/contact/all').get(Contact.all);
    app.route('/contact/:id').get(Contact.get);
    app.route('/contact').post(Contact.createContact);
    app.route('/contact/:id').delete(Contact.deleteContact);
    app.route('/contact/:id').patch(Contact.updateContact);
};
