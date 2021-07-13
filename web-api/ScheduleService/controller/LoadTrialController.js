const ScheduleSchema = require('../model/ScheduleDTO');
const MileageDTO = require('../model/MileageDTO');
const LoadTrialDTO = require('../model/LoadTrialDTO');
const LocoDTO = require('../model/LocomotiveDTO');
const CommentDTO = require('../model/commentDTO')

const saveLoadTrial = async(req, res, next) => {

    LoadTrialDTO.findOne({ loadNo: req.body.loadNo }).then(result => {
        if (result == null) {
            const loadTrial = new LoadTrialDTO(req.body);
            loadTrial.save().then(result => {
                res.status(200).json({ isSaved: true, data: result })
            }).catch(error => {
                res.status(500).json(error);
            })
        } else {
            res.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        res.status(500).json(er);
    });
}
const getAllLoadTrial = async(req, resp, next) => {
    console.log(resp)
    LoadTrialDTO.find().then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(result)
    })
};
const getOneLoad = (req, res) => {
    console.log(req.params.id);
    LoadTrialDTO.find({
        _id: req.params.id
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });

}

const makeComment = async(req, resp, next) => {
    const comment = new CommentDTO(req.body);
    await comment.save().then(result => {
        resp.status(200).json({ isSaved: true, data: result })
        console.log(result)
    }).catch(error => {
        resp.status(500).json(error);
    })
}

const addComment = async(req, resp) => {
    console.log(req.body);
    if (req.body) {
        await LoadTrialDTO.updateOne({ loadNo: req.body.loadNo }, { $set: req.body }, function(err, result) {

            if (err) {
                resp.status(500).json(err)
                console.log(err)
            } else {
                resp.status(200).json(result)

            }

        })

    }
}

getLoadComments = async(req, resp, next) => {
    const _id = req.params.id;
    console.log(_id);
    await CommentDTO.find({ loadNo: _id }, function(err, result) {
        if (err) {
            resp.status(500).json(err)
        } else {
            resp.status(200).json(result)
            console.log(result)
        }
    })
}

module.exports = {
    saveLoadTrial,
    getAllLoadTrial,
    getOneLoad,
    addComment,
    makeComment,
    getLoadComments
}