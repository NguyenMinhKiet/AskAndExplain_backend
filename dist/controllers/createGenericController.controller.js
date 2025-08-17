export function createCrudController(service) {
    return {
        async getAll(req, res, next) {
            try {
                const items = await service.getAll();
                res.json({ message: 'Get all successfully', data: items });
            }
            catch (err) {
                next(err);
            }
        },
        async getById(req, res, next) {
            try {
                const id = req.params.id;
                const item = await service.getById(id);
                res.json({ message: 'Get successfully', data: item });
            }
            catch (err) {
                next(err);
            }
        },
        async create(req, res, next) {
            try {
                const { data, uniqueFilter } = req.body;
                const newItem = await service.create(data, uniqueFilter);
                res.status(201).json({ message: 'Created successfully', data: newItem });
            }
            catch (err) {
                next(err);
            }
        },
        async update(req, res, next) {
            try {
                const { _id, data } = req.body;
                const updatedItem = await service.update(_id, data);
                res.json({ message: 'Updated successfully', data: updatedItem });
            }
            catch (err) {
                next(err);
            }
        },
        async delete(req, res, next) {
            try {
                const { id } = req.body;
                const deletedItem = await service.delete(id);
                res.json({ message: 'Deleted successfully', data: deletedItem });
            }
            catch (err) {
                next(err);
            }
        },
    };
}
//# sourceMappingURL=createGenericController.controller.js.map