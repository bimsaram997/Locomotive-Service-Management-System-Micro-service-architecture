const ScheduleSchema = require('../model/ScheduleDTO');
const MileageDTO = require('../model/MileageDTO');
const LoadTrialDTO = require('../model/LoadTrialDTO');
const LocoDTO = require('../model/LocomotiveDTO');
const CommentDTO = require('../model/commentDTO');
const feedLoadTrialDTO = require('../model/feedLoadTrialDTO');

//Load Trilas
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



//Comments
const makeComment = (req, resp, next) => {
    CommentDTO.findOne({ commentId: req.body.commentId }).then(result => {
        if (result == null) {
            const comment = new CommentDTO(req.body);
            comment.save().then(result => {
                resp.status(200).json({ isSaved: true, data: result })

            }).catch(error => {
                resp.status(500).json(error);
            })

        } else {
            res.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        res.status(500).json(er);
    });

}

const addComment = async(req, resp) => {
    // console.log(req.body);
    if (req.body) {
        await LoadTrialDTO.updateOne({ loadNo: req.body.loadNo }, { $set: req.body }, function(err, result) {

            if (err) {
                resp.status(500).json(err)

            } else {
                resp.status(200).json(result)

            }

        })

    }
}

getLoadComments = async(req, resp, next) => {
    const _id = req.params.id;
    //console.log(_id);
    await CommentDTO.find({ loadNo: _id }, function(err, result) {
        if (err) {
            resp.status(500).json(err)
        } else {
            resp.status(200).json(result)

        }
    })
}
const getOneComment = async(req, res) => {
    //console.log(req.params.id);
    await CommentDTO.find({
        _id: req.params.id
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });

}
const changeStatusComment = async(req, res, next) => { //change status of the comment after adding feedbacks by user
    const _obj = req.body;
    //console.log(_obj);
    //console.log(_obj.status)
    if (_obj.status = 2) {
        if (_obj.commentId) {
            console.log(_obj.commentId)
            await CommentDTO.updateOne({ commentId: _obj.commentId }, { $set: { status: 4, reason: "Resolved issues on Comments" } }, function(err, result) {

                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json(result)

                }

            })

        }
    }

}

const getResolvedComments = async(req, res, next) => {
    await CommentDTO.find({ status: 4 })
        .then(result => {
            res.status(200).json(result);
            //console.log(result)
        }).catch(er => {
            res.status(500).json(er);
        });
}


const acceptLoadTrial = async(req, res) => { //accept LoadTrial

    if (req.params.loadNo) {
        LoadTrialDTO.updateOne({ loadNo: req.params.loadNo }, { $set: { status: 2, reason: "Load Trial is Passed" } }, function(err, result) {

            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(result)
            }

        })

    }

}


//feedbacks


const addFeedBack = (req, resp, next) => {
    feedLoadTrialDTO.findOne({ feedId: req.body.feedId }).then(result => {
        if (result == null) {
            const feedback = new feedLoadTrialDTO(req.body);
            feedback.save().then(result => {
                resp.status(200).json({ isSaved: true, data: result })
                    //onsole.log(result)
            }).catch(error => {
                resp.status(500).json(error);
            })

        } else {
            res.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        res.status(500).json(er);
    });

}

const getOneFeedBack = async(req, res, next) => {
    console.log(req.params.commentId);
    await feedLoadTrialDTO.find({
        commentId: req.params.commentId
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });

}


module.exports = {
    saveLoadTrial,
    getAllLoadTrial,
    getOneLoad,
    acceptLoadTrial,

    addComment,
    makeComment,
    getLoadComments,
    getOneComment,
    changeStatusComment,
    getResolvedComments,

    addFeedBack,
    getOneFeedBack
}